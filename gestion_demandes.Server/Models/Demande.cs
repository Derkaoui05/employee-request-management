using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_demandes.Server.Models
{
    public class Demande
    {
        [Key]
        public int IdDemande { get; set; }

        [Required]
        public int Matricule { get; set; }

        [Required]
        public int IdType { get; set; }

        [Required]
        public DateTime DateDebut { get; set; }

        [Required]
        public DateTime DateFin { get; set; }

        public string Details { get; set; } = string.Empty;

        [Required]
        public string Statut { get; set; } = "En attente";

        public DateTime DateCreation { get; set; } = DateTime.Now;

        public DateTime? DateMiseAJour { get; set; }

        [ForeignKey("Matricule")]
        public virtual Employe? Employe { get; set; }

        [ForeignKey("IdType")]
        public virtual TypeDemande? TypeDemande { get; set; }
    }
}