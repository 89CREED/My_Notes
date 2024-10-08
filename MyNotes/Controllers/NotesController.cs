using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyNotes.Contracts;
using MyNotes.DataAccess;
using MyNotes.Models;
using System.Linq.Expressions;

namespace MyNotes.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly NotesDbContext _ctx;
        public NotesController(NotesDbContext ctx)
        {
            _ctx = ctx;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateNotesRequest request, CancellationToken ct)
        {
            var note = new Note(request.Title, request.Description);
            await _ctx.Notes.AddAsync(note, ct);
            await _ctx.SaveChangesAsync(ct);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]GetNotesRequest request, CancellationToken ct)
        {
            var notesQuery = _ctx.Notes
                .Where(n => string.IsNullOrWhiteSpace(request.Search) || 
                            n.Title.ToLower().Contains(request.Search.ToLower()));

            Expression<Func<Note, object>> selectorKey = request.SortItem?.ToLower() switch
            {
                "date" => note => note.CreatedAt,
                "title" => note => note.Title,
                _ => note => note.Id
            };

            notesQuery = request.SortOrder == "desc"
                ? notesQuery.OrderByDescending(selectorKey)
                : notesQuery.OrderBy(selectorKey);

            var noteDto = await notesQuery
                .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
                .ToListAsync(ct);

            return Ok(new GetNotesResponse(noteDto));
        }


    }

}
