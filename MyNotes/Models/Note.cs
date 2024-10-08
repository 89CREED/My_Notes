namespace MyNotes.Models
{
    public class Note
    {
        public Guid Id { get; init; }
        public string Title { get; init; } 
        public string Description { get; init; }
        public DateTime CreatedAt { get; init; }

        

        public Note(string title, string description) 
        {  
            this.Title = title;
            this.Description = description;
            CreatedAt = DateTime.UtcNow;
        }

    }
}
