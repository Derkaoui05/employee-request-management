using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace gestion_demandes.Server.Models
{
    public class TypeDemande
    {
        [Key]
        public int IdType { get; set; }

        [Required]
        [StringLength(50)]
        public string NomType { get; set; } = string.Empty;
        public virtual ICollection<Demande> Demandes { get; set; } = new List<Demande>();
    }
}