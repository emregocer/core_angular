using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetCoreAPI.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace NetCoreAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly AppContext _context;

        public CategoryController(AppContext context)
        {
            _context = context;
        }

        // GET api/category
        [HttpGet]
        public IActionResult Get(string filter, string sort_prop="id", string sort_by = "asc", int pageIndex=0, int pageSize=10)
        {
            bool descending = false;
            if (sort_by != "asc")
                descending = true;

            var categories = _context.Categories
                .Where(c => c.Name.Contains(filter ?? "") || c.Description.Contains(filter ?? ""))
                .OrderByWithDirection(c => c.GetPropertyDynamic(sort_prop), descending)
                .Skip(pageIndex * pageSize).Take(pageSize).ToList();

            var payload = new JObject { ["data"] = JArray.FromObject(categories) };
            payload.Add("count", JToken.FromObject(_context.Categories.Count()));
              
            return Ok(payload);
        }

        // GET api/category/5
        [HttpGet("{id}", Name="GetCategory")]
        public IActionResult Get(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if(category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // POST api/category
        [HttpPost]
        public IActionResult Post([FromBody]Category category)
        {
            if(category == null)
            {
                return BadRequest();
            }

            _context.Categories.Add(category);
            _context.SaveChanges();

            return CreatedAtRoute("GetCategory", new { id = category.Id }, category);
        }

        // PUT api/category/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Category category)
        {
            if(category == null || category.Id != id)
            {
                return BadRequest();
            }

            var currentCategory = _context.Categories.FirstOrDefault(c => c.Id == id);
            if(currentCategory == null)
            {
                return NotFound();
            }

            _context.Entry(currentCategory).CurrentValues.SetValues(category);
            _context.SaveChanges();

            return Ok();
        }

        // DELETE api/category/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return Ok();
        }
    }
}