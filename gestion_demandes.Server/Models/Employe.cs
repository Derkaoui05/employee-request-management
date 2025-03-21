using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace gestion_demandes.Server.Models
{
    public class Employe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Matricule { get; set; }

        [Required]
        public string Nom { get; set; } = string.Empty;

        [Required]
        public string Prenom { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string MotDePasse { get; set; } = string.Empty;

        public DateTime DateEmbauche { get; set; }

        public int IdRole { get; set; }

        [ForeignKey("IdRole")]
        public virtual Role? Role { get; set; }

        public int? IdDepartement { get; set; }

        [ForeignKey("IdDepartement")]
        [JsonIgnore]
        public virtual Departement? Departement { get; set; }
        public virtual ICollection<Demande> Demandes { get; set; } = new List<Demande>();

        public int SoldeConge { get; set; } = 18;
    }
}