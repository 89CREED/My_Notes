using Microsoft.EntityFrameworkCore;
using MyNotes.Models;


namespace MyNotes.DataAccess
{
    public class NotesDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public NotesDbContext(IConfiguration config)
        {
            this._configuration = config;
        }

        public DbSet<Note> Notes {  get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Database"));
        }
    }
}
