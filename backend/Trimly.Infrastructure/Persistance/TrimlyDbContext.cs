using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace Trimly.Infrastructure.Persistance;

public class TrimlyDbContext : IdentityDbContext<IdentityUser>
{
    public TrimlyDbContext(DbContextOptions<TrimlyDbContext> options) : base(options)
    {
    }

    // DbSets for your entities
}