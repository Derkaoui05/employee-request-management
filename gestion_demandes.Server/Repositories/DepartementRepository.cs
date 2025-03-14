using gestion_demandes.Server.Data;
using gestion_demandes.Server.Models;
using gestion_demandes.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace gestion_demandes.Server.Repositories
{
    public class DepartementRepository : IDepartementRepository
    {
        private readonly GestionDemandesContext _context;

        public DepartementRepository(GestionDemandesContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Departement>> GetAllDepartements()
        {
            return await _context.Departements.ToListAsync();
        }
    }
}
