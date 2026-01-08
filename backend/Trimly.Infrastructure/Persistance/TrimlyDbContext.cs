using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Trimly.Domain.Barbershop;
using Trimly.Domain.User;

namespace Trimly.Infrastructure.Persistance;

public class TrimlyDbContext : IdentityDbContext<TrimlyUser, IdentityRole, string>
{
    /// <summary>
    /// Represents the db set for barbershops
    /// </summary>
    public DbSet<Barbershop>  Barbershops { get; set; }
    
    public TrimlyDbContext(DbContextOptions<TrimlyDbContext> options) : base(options)
    {
    }

    // DbSets for your entities
    
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TrimlyUser>()
            .HasOne(e => e.Barbershop)
            .WithOne(u => u.OwnerUser)
            .HasForeignKey<Barbershop>(k => k.OwnerUserId)
            .IsRequired();
        
        
        base.OnModelCreating(modelBuilder);
    }
}