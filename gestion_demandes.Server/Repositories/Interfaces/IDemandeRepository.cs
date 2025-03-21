using gestion_demandes.Server.Models;

namespace gestion_demandes.Server.Repositories.Interfaces
{
    public interface IDemandeRepository
    {
        Task<IEnumerable<Demande>> GetAllDemandes();
        Task<Demande?> GetDemandeById(int id);
        Task<IEnumerable<Demande>> GetDemandesByEmploye(int matricule);
        Task<Demande> AddDemande(Demande demande);
        Task UpdateDemande(Demande demande);
        Task DeleteDemande(int id);
        Task<bool> DemandeExists(int id);
    }
}