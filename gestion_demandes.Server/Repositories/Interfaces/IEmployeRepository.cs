using gestion_demandes.Server.Models;

namespace gestion_demandes.Server.Repositories.Interfaces
{
    public interface IEmployeRepository
    {
        Task<IEnumerable<Employe>> GetAllEmployes();
        Task<Employe?> GetEmployeByMatricule(int matricule);
        Task<Employe> AddEmploye(Employe employe);
        Task UpdateEmploye(Employe employe);
        Task DeleteEmploye(int matricule);
    }
}