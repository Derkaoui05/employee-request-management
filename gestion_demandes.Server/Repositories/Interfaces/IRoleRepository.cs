using gestion_demandes.Server.Models;

namespace gestion_demandes.Server.Repositories.Interfaces
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetAllRoles();
    }
}