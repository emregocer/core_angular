using Microsoft.EntityFrameworkCore;
using NetCoreAPI.Models;

namespace NetCoreAPI
{
    public class AppContext : DbContext
    {
        public AppContext(DbContextOptions<AppContext> options) : base(options)
        {             
        }

        public DbSet<Category> Categories { get; set; }
    }
}
