using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_demandes.Server.Models
{
    public class Demande
    {
        [Key]
        public int IdDemande { get; set; }

        [ForeignKey("Demandeur")]
        public int MatriculeDemandeur { get; set; }
        public Employe Demandeur { get; set; }

        [ForeignKey("Employe")]
        public int MatriculeEmploye { get; set; }
        public Employe Employe { get; set; }

        [ForeignKey("TypeDemande")]
        public int IdType { get; set; }
        public TypeDemande TypeDemande { get; set; }

        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public decimal DureeJournaliere { get; set; }
        public decimal SoldeConge { get; set; }
        public string Commentaire { get; set; }
        public string Statut { get; set; } = "en attente";
        public DateTime DateCreation { get; set; } = DateTime.Now;
    }
}
