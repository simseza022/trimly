using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Trimly.Domain.Common;
using Trimly.Domain.User;

namespace Trimly.Domain.Barbershop;

/// <summary>
/// Represents a barbershop in the system.
/// </summary>
[Table("Barbershops", Schema = Schemas.BarberSchema)]
public class Barbershop
{
    /// <summary>
    /// Unique identifier for the barbershop.
    /// </summary>
    [Key]
    public Guid Id { get; set; }
    
    /// <summary>
    /// Name of the barbershop.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Provides a textual description of the barbershop, detailing its features, services, or other relevant information.
    /// </summary>
    [Column(TypeName = "varchar(500)")]
    public string Description { get; set; } = string.Empty;
    
    /// <summary>
    /// Represents the barbershp location
    /// </summary>
    [Column(TypeName = "nvarchar(max)")]
    public string Location { get; set; } = string.Empty;
    
    /// <summary>
    /// Represents the barbershp location latitude
    /// </summary>
    [Column(TypeName = "decimal(9,6)")]
    public decimal Latitude { get; set; }

    /// <summary>
    /// Represents the barbershp location longitude
    /// </summary>
    [Column(TypeName = "decimal(9,6)")]
    public decimal Longitude { get; set; }
    
    /// <summary>
    /// Represents the phone number of the barbershop
    /// </summary>
    [MaxLength(13)]
    public string? PhoneNumber { get; set; } 
    
    /// <summary>
    /// Image for the barbershop
    /// </summary>
    public string? ImageId { get; set; }
    
    /// <summary>
    /// Represents the identifier for the owner of the barbershop
    /// </summary>
    [Required]
    public required string OwnerUserId { get; set; }
    
    /// <summary>
    /// Navigation to the user that owns the barbershop
    /// </summary>
    public required TrimlyUser OwnerUser { get; set; } // Navigation
}