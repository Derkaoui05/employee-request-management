namespace gestion_demandes.Server.DTOs
{
    public class EmployeDTO
    {
        public int Matricule { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public string MotDePasse { get; set; }
        public DateTime DateEmbauche { get; set; }
        public int IdRole { get; set; }
        public int? IdDepartement { get; set; }
    }
}
