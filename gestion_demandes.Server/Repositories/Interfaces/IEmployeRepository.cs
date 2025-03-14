using gestion_demandes.Server.Models;
using gestion_demandes.Server.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gestion_demandes.Server.Repositories.Interfaces
{
    public interface IEmployeRepository
    {
        Task<IEnumerable<EmployeDetailDTO>> GetAllWithDetailsAsync();
        Task<EmployeDetailDTO> GetByIdWithDetailsAsync(int matricule);
        Task<Employe> AddAsync(Employe employe);
        Task UpdateAsync(Employe employe);
        Task DeleteAsync(int matricule);
    }
}