using System.ComponentModel.DataAnnotations;

namespace gestion_demandes.Server.Models
{
    public class Role
    {
        [Key]
        public int IdRole { get; set; }

        [Required]
        public string NomRole { get; set; } = string.Empty;
    }
}
