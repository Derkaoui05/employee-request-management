using System.ComponentModel.DataAnnotations;

namespace gestion_demandes.Server.Models
{
    public class Role
    {
        [Key]
        public int IdRole { get; set; }
        public string NomRole { get; set; }
        public int NiveauAcces { get; set; }
    }
}
