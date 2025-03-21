using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_demandes.Server.Models
{
    public class Equipe
    {
        [Key]
        public int IdEquipe { get; set; }

        [Required]
        public string NomEquipe { get; set; } = string.Empty;

        public int IdDepartement { get; set; }

        [ForeignKey("IdDepartement")]
        public virtual Departement? Departement { get; set; }

        public int MatriculeResponsable { get; set; }

        [ForeignKey("MatriculeResponsable")]
        public virtual Employe? Responsable { get; set; }

        public int? EquipeParentId { get; set; }

        [ForeignKey("EquipeParentId")]
        public virtual Equipe? EquipeParent { get; set; }
    }
}
