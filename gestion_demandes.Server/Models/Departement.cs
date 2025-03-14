using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace gestion_demandes.Server.Models
{
    public class Departement
    {
        [Key]
        public int IdDepartement { get; set; }

        public string NomDepartement { get; set; }

        [ForeignKey("Manager")]
        public int? MatriculeManager { get; set; }
        public Employe Manager { get; set; }
        [JsonIgnore]
        public List<Employe> Employes { get; set; } = new List<Employe>();
    }
}
