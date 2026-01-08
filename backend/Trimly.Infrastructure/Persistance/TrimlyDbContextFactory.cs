using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;


namespace Trimly.Infrastructure.Persistance;

public class TrimlyDbContextFactory 
    : IDesignTimeDbContextFactory<TrimlyDbContext>
{
    public TrimlyDbContext CreateDbContext(string[] args)
    {
        // EF runs from Trimly.Infrastructure
        var infrastructurePath = Directory.GetCurrentDirectory();

        var apiPath = Path.GetFullPath(
            Path.Combine(infrastructurePath, "..", "Trimly.API")
        );

        if (!Directory.Exists(apiPath))
        {
            throw new DirectoryNotFoundException(
                $"API project not found at: {apiPath}"
            );
        }
        
        // Build config manually (EF CLI has no Program.cs)
        IConfiguration configuration = new ConfigurationBuilder()
            .SetBasePath(apiPath)
            .AddJsonFile("appsettings.json", optional: false)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .AddEnvironmentVariables()
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<TrimlyDbContext>();

        var connectionString =
            configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException(
                "Connection string 'DefaultConnection' not found.");

        optionsBuilder.UseSqlServer(connectionString);

        return new TrimlyDbContext(optionsBuilder.Options);
    }
}