namespace gestion_demandes.Server.DTOs
{
    public class EmployeDTO
    {
        public int Matricule { get; set; }
        public string Nom { get; set; } = string.Empty;
        public string Prenom { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MotDePasse { get; set; } = string.Empty;
        public DateTime DateEmbauche { get; set; }
        public int IdRole { get; set; }
        public int? IdDepartement { get; set; }
    }
}
