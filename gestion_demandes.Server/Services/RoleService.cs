using gestion_demandes.Server.Models;
using gestion_demandes.Server.Repositories.Interfaces;

namespace gestion_demandes.Server.Services
{
    public class RoleService : IRoleRepository
    {
        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        // Get all roles
        public async Task<IEnumerable<Role>> GetAllRoles()
        {
            return await _roleRepository.GetAllRoles();
        }
    }
}
