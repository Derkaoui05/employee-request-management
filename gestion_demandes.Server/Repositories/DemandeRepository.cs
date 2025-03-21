using gestion_demandes.Server.Data;
using gestion_demandes.Server.Models;
using gestion_demandes.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gestion_demandes.Server.Repositories
{
    public class DemandeRepository : IDemandeRepository
    {
        private readonly GestionDemandesContext _context;

        public DemandeRepository(GestionDemandesContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Demande>> GetAllDemandes()
        {
            return await _context.Demandes
                .Include(d => d.TypeDemande)
                .Include(d => d.Employe)
                .ToListAsync();
        }

        public async Task<Demande?> GetDemandeById(int id)
        {
            return await _context.Demandes
                .Include(d => d.TypeDemande)
                .Include(d => d.Employe)
                .FirstOrDefaultAsync(d => d.IdDemande == id);
        }

        public async Task<IEnumerable<Demande>> GetDemandesByEmploye(int matricule)
        {
            return await _context.Demandes
                .Include(d => d.TypeDemande)
                .Where(d => d.Matricule == matricule)
                .ToListAsync();
        }

        public async Task<Demande> AddDemande(Demande demande)
        {
            _context.Demandes.Add(demande);
            await _context.SaveChangesAsync();
            return demande;
        }

        public async Task UpdateDemande(Demande demande)
        {
            _context.Entry(demande).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDemande(int id)
        {
            var demande = await _context.Demandes.FindAsync(id);
            if (demande != null)
            {
                _context.Demandes.Remove(demande);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> DemandeExists(int id)
        {
            return await _context.Demandes.AnyAsync(e => e.IdDemande == id);
        }
    }
}