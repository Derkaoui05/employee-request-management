using gestion_demandes.Server.Data;
using gestion_demandes.Server.Models;
using gestion_demandes.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace gestion_demandes.Server.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly GestionDemandesContext _context;

        public RoleRepository(GestionDemandesContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> GetAllRoles()
        {
            return await _context.Roles.ToListAsync();
        }
    }
}
