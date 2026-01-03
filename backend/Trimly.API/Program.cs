using System.Reflection;
using Microsoft.AspNetCore.Identity;

using Trimly.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthorization();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddInfrastructure(connectionString ?? "DefaultConnection");

// register TimeProvider required by Identity API endpoints
builder.Services.AddSingleton(System.TimeProvider.System);

builder.Services.AddSingleton<IEmailSender<IdentityUser>, EmailSender>();

// cfg.RegisterServicesFromAssembly(typeof(Trimly.Application.SomeHandler).Assembly);
builder.Services.AddMediatR(cfg => 
{
    cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
});


// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();


app.MapIdentityApi<IdentityUser>();

app.MapControllers();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.Run();
