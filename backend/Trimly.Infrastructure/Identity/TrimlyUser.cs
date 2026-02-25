using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Trimly.Domain.Barbershop;

namespace Trimly.Infrastructure.Identity;

/// <summary>
/// Represents an application user within the Trimly system.
/// Inherits from IdentityUser to provide identity and authentication functionalities.
/// </summary>
public class TrimlyUser : IdentityUser
{
    
    /// <summary>
    /// Represents the first name of the user
    /// </summary>
    [MaxLength(50)]
    public string? FirstName { get; set; }
    
    /// <summary>
    /// Represents the last name of the user
    /// </summary>
    [MaxLength(50)]
    public string? LastName { get; set; }
    
    /// <summary>
    /// Represents the users Profile picture ID
    /// </summary>
    [MaxLength(50)]
    public string? ProfilePictureId { get; set; }

    /// <summary>
    /// Provides additional details or information about the user.
    /// </summary>
    [MaxLength(500)]
    public string? Description { get; set; }

    /// <summary>
    /// Provides a reference to the barbershop that the user belongs to.
    /// </summary>

    public ICollection<Barbershop> OwnedBarberShops { get; set; } = null;
}

