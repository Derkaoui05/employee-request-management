namespace gestion_demandes.Server.DTOs
{
    public class EmployeDetailDTO
    {
        public int Matricule { get; set; }
        public string Nom { get; set; } = string.Empty;
        public string Prenom { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime DateEmbauche { get; set; }
        public int IdRole { get; set; }
        public string NomRole { get; set; } = string.Empty;
        public int? IdDepartement { get; set; }
        public string NomDepartement { get; set; } = string.Empty;
        public int SoldeConge { get; set; }
    }
}