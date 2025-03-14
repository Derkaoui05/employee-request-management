using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_demandes.Server.Models
{
    public class Equipe
    {
        [Key]
        public int IdEquipe { get; set; }
        public string NomEquipe { get; set; }

        [ForeignKey("Departement")]
        public int IdDepartement { get; set; }
        public Departement Departement { get; set; }

        [ForeignKey("Responsable")]
        public int MatriculeResponsable { get; set; }
        public Employe Responsable { get; set; }

        [ForeignKey("EquipeParent")]
        public int? EquipeParentId { get; set; }
        public Equipe EquipeParent { get; set; }
    }
}
