using gestion_demandes.Server.Models;
using gestion_demandes.Server.Repositories;
using gestion_demandes.Server.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gestion_demandes.Server.Services
{
    public class DemandeService
    {
        private readonly IDemandeRepository _demandeRepository;

        public DemandeService(IDemandeRepository demandeRepository)
        {
            _demandeRepository = demandeRepository;
        }

        public async Task<IEnumerable<Demande>> GetAllDemandes()
        {
            return await _demandeRepository.GetAllDemandes();
        }

        public async Task<Demande?> GetDemandeById(int id)
        {
            return await _demandeRepository.GetDemandeById(id);
        }

        public async Task<IEnumerable<Demande>> GetDemandesByEmploye(int matricule)
        {
            return await _demandeRepository.GetDemandesByEmploye(matricule);
        }

        public async Task<Demande> AddDemande(Demande demande)
        {
            return await _demandeRepository.AddDemande(demande);
        }

        public async Task UpdateDemande(Demande demande)
        {
            await _demandeRepository.UpdateDemande(demande);
        }

        public async Task DeleteDemande(int id)
        {
            await _demandeRepository.DeleteDemande(id);
        }

        public async Task<bool> DemandeExists(int id)
        {
            return await _demandeRepository.DemandeExists(id);
        }
    }
}