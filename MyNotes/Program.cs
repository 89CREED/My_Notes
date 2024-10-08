using MyNotes.DataAccess;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddScoped<NotesDbContext>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173");
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});


var app = builder.Build();

using var scope = app.Services.CreateScope();
await using var dbContext = scope.ServiceProvider.GetRequiredService<NotesDbContext>();
try
{
    await dbContext.Database.EnsureCreatedAsync();
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.MapControllers();

app.Run();
