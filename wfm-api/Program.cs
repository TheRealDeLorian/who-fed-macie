var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactNativeWeb",
        policy => policy
            .WithOrigins("http://localhost:8081")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactNativeWeb");

app.MapGet("/whofedmacie", () =>
{
    var mostRecentFeedingInfo = new
    {
        personWhoFedMacie = "Dorian",
        timeFed = new DateTime(2025, 8, 8, 22, 24, 0, DateTimeKind.Local)
    };
    Console.WriteLine("sending data to client");
    return mostRecentFeedingInfo;
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
