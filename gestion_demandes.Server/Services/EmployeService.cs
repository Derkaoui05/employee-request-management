using gestion_demandes.Server.Models;
using gestion_demandes.Server.DTOs;
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

        public async Task<IEnumerable<EmployeDetailDTO>> GetAllEmployes()
        {
            return await _employeRepository.GetAllWithDetailsAsync();
        }

        public async Task<EmployeDetailDTO> GetEmployeByMatricule(int matricule)
        {
            return await _employeRepository.GetByIdWithDetailsAsync(matricule);
        }

        public async Task<Employe> AddEmploye(Employe employe)
        {
            return await _employeRepository.AddAsync(employe);
        }

        public async Task UpdateEmploye(Employe employe)
        {
            await _employeRepository.UpdateAsync(employe);
        }

        public async Task DeleteEmploye(int matricule)
        {
            await _employeRepository.DeleteAsync(matricule);
        }
    }
}