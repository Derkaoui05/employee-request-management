using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace gestion_demandes.Server.Models
{
    public class Employe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Matricule { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public string MotDePasse { get; set; }
        public DateTime DateEmbauche { get; set; }

        [ForeignKey("Role")]
        public int IdRole { get; set; }
        public Role Role { get; set; }

        [ForeignKey("Departement")]
        public int? IdDepartement { get; set; }
        [JsonIgnore]
        public Departement Departement { get; set; }
    }
}