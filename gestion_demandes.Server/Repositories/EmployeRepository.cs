using gestion_demandes.Server.Data;
using gestion_demandes.Server.Models;
using gestion_demandes.Server.DTOs;
using gestion_demandes.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gestion_demandes.Server.Repositories
{
    public class EmployeRepository : IEmployeRepository
    {
        private readonly GestionDemandesContext _context;

        public EmployeRepository(GestionDemandesContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EmployeDetailDTO>> GetAllWithDetailsAsync()
        {
            return await _context.Employes
                .Include(e => e.Role)
                .Include(e => e.Departement)
                .Select(e => new EmployeDetailDTO
                {
                    Matricule = e.Matricule,
                    Nom = e.Nom,
                    Prenom = e.Prenom,
                    Email = e.Email,
                    DateEmbauche = e.DateEmbauche,
                    IdRole = e.IdRole,
                    NomRole = e.Role.NomRole,
                    IdDepartement = e.IdDepartement,
                    NomDepartement = e.Departement != null ? e.Departement.NomDepartement : null
                })
                .ToListAsync();
        }

        public async Task<EmployeDetailDTO> GetByIdWithDetailsAsync(int matricule)
        {
            return await _context.Employes
                .Include(e => e.Role)
                .Include(e => e.Departement)
                .Where(e => e.Matricule == matricule)
                .Select(e => new EmployeDetailDTO
                {
                    Matricule = e.Matricule,
                    Nom = e.Nom,
                    Prenom = e.Prenom,
                    Email = e.Email,
                    DateEmbauche = e.DateEmbauche,
                    IdRole = e.IdRole,
                    NomRole = e.Role.NomRole,
                    IdDepartement = e.IdDepartement,
                    NomDepartement = e.Departement != null ? e.Departement.NomDepartement : null
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Employe> AddAsync(Employe employe)
        {
            _context.Employes.Add(employe);
            await _context.SaveChangesAsync();
            return employe;
        }

        public async Task UpdateAsync(Employe employe)
        {
            _context.Entry(employe).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int matricule)
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