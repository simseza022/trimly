using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Trimly.Domain.User;
using Trimly.Infrastructure.Persistance;

namespace Trimly.Infrastructure;

public static class DependencyInjection
{
    /// <summary>
    /// Configures DI container for the infrastructure layer
    /// </summary>
    /// <param name="services">DI container</param>
    /// <param name="connectionString">Database connection string</param>
    /// <returns>IService collection</returns>
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<TrimlyDbContext>(
            options => options.UseSqlServer(connectionString));

        // services.AddIdentityCore<IdentityUser>(options =>
        //     {
        //         options.Password.RequireDigit = true;
        //         options.Password.RequiredLength = 6;
        //         options.Password.RequireNonAlphanumeric = true;
        //         options.Password.RequireUppercase = true;
        //         options.Password.RequireLowercase = true;
        //     })
        //     .AddEntityFrameworkStores<TrimlyDbContext>();
        services.AddIdentity<TrimlyUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
            })
            .AddEntityFrameworkStores<TrimlyDbContext>()
            .AddDefaultTokenProviders();

        return services;
    }
}