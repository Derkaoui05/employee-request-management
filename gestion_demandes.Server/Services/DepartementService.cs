using gestion_demandes.Server.Models;
using gestion_demandes.Server.Repositories.Interfaces;

namespace gestion_demandes.Server.Services
{
    public class DepartementService:IDepartementRepository
    {
        private readonly IDepartementRepository _departementRepository;

        public DepartementService(IDepartementRepository departementRepository)
        {
            _departementRepository = departementRepository;
        }

        // Get all departments
        public async Task<IEnumerable<Departement>> GetAllDepartements()
        {
            return await _departementRepository.GetAllDepartements();
        }
    }
}
