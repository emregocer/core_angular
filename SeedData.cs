using Microsoft.EntityFrameworkCore;
using NetCoreAPI.Models;
using System;
using System.Collections.Generic;

namespace NetCoreAPI
{
    public class SeedData
    {
        public static void SeedDb(AppContext context)
        {
            var categories = new List<Category> {};
      
            categories.Add(new Category { Name = "CDEE Placeholder name  ", Description = "Placeholder category description", IsAvailable = true, IsLocked = false });
            categories.Add(new Category { Name = "ABCD Placeholder name  ", Description = "Placeholder category description", IsAvailable = true, IsLocked = false });
            categories.Add(new Category { Name = "CFDG Placeholder name  ", Description = "Placeholder category description", IsAvailable = true, IsLocked = false });
            categories.Add(new Category { Name = "XDFD Placeholder name  ", Description = "Placeholder category description", IsAvailable = true, IsLocked = false });
            categories.Add(new Category { Name = "GHJK Placeholder name  ", Description = "Placeholder category description", IsAvailable = true, IsLocked = false });
            categories.Add(new Category { Name = "QWER Placeholder name  ", Description = "Placeholder category description", IsAvailable = true, IsLocked = false });
            categories.Add(new Category { Name = "YUIO Placeholder name  ", Description = "Placeholder category description", IsAvailable = true, IsLocked = false });
            categories.Add(new Category { Name = "POIU Placeholder name  ", Description = "Placeholder category description", IsAvailable = true, IsLocked = false });
            categories.Add(new Category { Name = "MNBV Placeholder name  ", Description = "Placeholder category description", IsAvailable = true, IsLocked = false });
            categories.Add(new Category { Name = "ZSDF Placeholder name  ", Description = "Placeholder category description", IsAvailable = true, IsLocked = false });
            categories.Add(new Category { Name = "GYHJ Placeholder name  ", Description = "Placeholder category description", IsAvailable = true, IsLocked = false });
            categories.Add(new Category { Name = "UJKI Placeholder name  ", Description = "Placeholder category description", IsAvailable = true, IsLocked = false });

            categories.ForEach(c => context.Categories.Add(c));
            context.SaveChanges();
        }
    }
}