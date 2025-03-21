using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace gestion_demandes.Server.Models
{
    public class Departement
    {
        [Key]
        public int IdDepartement { get; set; }

        [Required]
        public string NomDepartement { get; set; } = string.Empty;

        public int? MatriculeManager { get; set; }

        [ForeignKey("MatriculeManager")]
        public virtual Employe? Manager { get; set; }

        public virtual ICollection<Employe> Employes { get; set; } = new List<Employe>();
    }
}
