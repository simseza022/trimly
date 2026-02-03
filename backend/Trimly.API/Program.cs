using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Razor;
using Trimly.API.Options;
using Trimly.Domain.User;
using Trimly.Infrastructure;
using Trimly.Infrastructure.Helpers;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthorization();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddInfrastructure(connectionString ?? "DefaultConnection");

// register TimeProvider required by Identity API endpoints
builder.Services.AddSingleton(System.TimeProvider.System);

builder.Services.AddTransient<IEmailSender<TrimlyUser>, EmailSender>();
builder.Services.AddTransient(typeof(RazorViewToStringRenderer));

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

builder.Services.AddRazorPages();

builder.Services
    .AddControllersWithViews()
    .AddRazorRuntimeCompilation();

builder.Services.AddAuthentication()
    .AddBearerToken(IdentityConstants.BearerScheme); 


builder.Services.Configure<SmtpOptions>(builder.Configuration.GetSection(SmtpOptions.Smtp));

var app = builder.Build();

app.UseRouting();  

app.UseAuthentication();
app.UseAuthorization();

app.MapIdentityApi<TrimlyUser>();

app.MapRazorPages();

app.MapControllers();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.Run();
