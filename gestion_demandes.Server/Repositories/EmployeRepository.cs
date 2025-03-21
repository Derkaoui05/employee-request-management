using gestion_demandes.Server.Data;
using gestion_demandes.Server.Models;
using gestion_demandes.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace gestion_demandes.Server.Repositories
{
    public class EmployeRepository : IEmployeRepository
    {
        private readonly GestionDemandesContext _context;

        public EmployeRepository(GestionDemandesContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employe>> GetAllEmployes()
        {
            return await _context.Employes
                .Include(e => e.Role)
                .Include(e => e.Departement)
                .ToListAsync();
        }

        public async Task<Employe?> GetEmployeByMatricule(int matricule)
        {
            return await _context.Employes
                .Include(e => e.Role)
                .Include(e => e.Departement)
                .FirstOrDefaultAsync(e => e.Matricule == matricule);
        }

        public async Task<Employe> AddEmploye(Employe employe)
        {
            _context.Employes.Add(employe);
            await _context.SaveChangesAsync();
            return employe;
        }

        public async Task UpdateEmploye(Employe employe)
        {
            _context.Entry(employe).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEmploye(int matricule)
        {
            var employe = await _context.Employes.FindAsync(matricule);
            if (employe != null)
            {
                _context.Employes.Remove(employe);
                await _context.SaveChangesAsync();
            }
        }
    }
}