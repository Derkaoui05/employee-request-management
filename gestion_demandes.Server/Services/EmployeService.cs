using gestion_demandes.Server.Models;
using gestion_demandes.Server.Repositories;
using gestion_demandes.Server.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gestion_demandes.Server.Services
{
    public class EmployeService
    {
        private readonly IEmployeRepository _employeRepository;

        public EmployeService(IEmployeRepository employeRepository)
        {
            _employeRepository = employeRepository;
        }

        public async Task<IEnumerable<Employe>> GetAllEmployes()
        {
            return await _employeRepository.GetAllEmployes();
        }

        public async Task<Employe?> GetEmployeByMatricule(int matricule)
        {
            return await _employeRepository.GetEmployeByMatricule(matricule);
        }

        public async Task<Employe> AddEmploye(Employe employe)
        {
            return await _employeRepository.AddEmploye(employe);
        }

        public async Task UpdateEmploye(Employe employe)
        {
            await _employeRepository.UpdateEmploye(employe);
        }

        public async Task DeleteEmploye(int matricule)
        {
            await _employeRepository.DeleteEmploye(matricule);
        }
    }
}