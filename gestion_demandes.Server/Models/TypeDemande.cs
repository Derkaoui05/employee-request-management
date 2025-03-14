using System.ComponentModel.DataAnnotations;

namespace gestion_demandes.Server.Models
{
    public class TypeDemande
    {
        [Key]
        public int IdType { get; set; }
        public string NomType { get; set; }
    }
}
