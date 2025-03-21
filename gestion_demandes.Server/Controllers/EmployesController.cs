using gestion_demandes.Server.Models;
using gestion_demandes.Server.Services;
using gestion_demandes.Server.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gestion_demandes.Server.Data;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace gestion_demandes.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployesController : ControllerBase
    {
        private readonly EmployeService _employeService;
        private readonly GestionDemandesContext _context;

        public EmployesController(EmployeService employeService, GestionDemandesContext context)
        {
            _employeService = employeService;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employes = await _employeService.GetAllEmployes();
            return Ok(employes);
        }

        [HttpGet("{matricule}")]
        public async Task<IActionResult> GetByMatricule(int matricule)
        {
            var employe = await _employeService.GetEmployeByMatricule(matricule);
            if (employe == null)
            {
                return NotFound();
            }
            return Ok(employe);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] EmployeDTO employeDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Vérifier si le rôle existe
            var role = await _context.Roles.FindAsync(employeDTO.IdRole);
            if (role == null)
            {
                return BadRequest("Le rôle spécifié n'existe pas.");
            }

            // Vérifier si le département existe (s'il est spécifié)
            if (employeDTO.IdDepartement.HasValue)
            {
                var departement = await _context.Departements.FindAsync(employeDTO.IdDepartement.Value);
                if (departement == null)
                {
                    return BadRequest("Le département spécifié n'existe pas.");
                }
            }

            // Créer un nouvel employé à partir du DTO
            var employe = new Employe
            {
                Nom = employeDTO.Nom,
                Prenom = employeDTO.Prenom,
                Email = employeDTO.Email,
                MotDePasse = employeDTO.MotDePasse,
                DateEmbauche = employeDTO.DateEmbauche,
                IdRole = employeDTO.IdRole,
                IdDepartement = employeDTO.IdDepartement,
                SoldeConge = 18 // Valeur par défaut
            };

            await _employeService.AddEmploye(employe);

            // Récupérer l'employé créé avec ses détails
            var createdEmploye = await _employeService.GetEmployeByMatricule(employe.Matricule);
            return CreatedAtAction(nameof(GetByMatricule), new { matricule = employe.Matricule }, createdEmploye);
        }

        // GET: api/Employes/5/solde-conge
        [HttpGet("{matricule}/solde-conge")]
        public async Task<ActionResult<object>> GetEmployeSoldeConge(int matricule)
        {
            var employe = await _context.Employes.FindAsync(matricule);
            if (employe == null)
            {
                return NotFound("L'employé spécifié n'existe pas.");
            }

            int soldeConge = employe.SoldeConge; // Utiliser la propriété SoldeConge de l'employé

            // Calculer le solde en fonction des demandes de congés approuvées
            var demandesConges = await _context.Demandes
                .Include(d => d.TypeDemande)
                .Where(d => d.Matricule == matricule &&
                           d.Statut == "Approuvé" &&
                           d.TypeDemande.NomType.Contains("Congé") &&
                           !d.TypeDemande.NomType.Contains("sans solde"))
                .ToListAsync();

            foreach (var demande in demandesConges)
            {
                // Calculer la durée de la demande en jours
                int duree = (int)(demande.DateFin - demande.DateDebut).TotalDays + 1;
                soldeConge -= duree;
            }

            return new { soldeConge = Math.Max(0, soldeConge) };
        }

        [HttpPut("{matricule}")]
        public async Task<IActionResult> Update(int matricule, [FromBody] EmployeDTO employeDTO)
        {
            if (matricule != employeDTO.Matricule)
            {
                return BadRequest("Le matricule dans l'URL ne correspond pas au matricule dans les données.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Vérifier si l'employé existe
            var existingEmploye = await _context.Employes.FindAsync(matricule);
            if (existingEmploye == null)
            {
                return NotFound("L'employé spécifié n'existe pas.");
            }

            // Vérifier si le rôle existe
            var role = await _context.Roles.FindAsync(employeDTO.IdRole);
            if (role == null)
            {
                return BadRequest("Le rôle spécifié n'existe pas.");
            }

            // Vérifier si le département existe (s'il est spécifié)
            if (employeDTO.IdDepartement.HasValue)
            {
                var departement = await _context.Departements.FindAsync(employeDTO.IdDepartement.Value);
                if (departement == null)
                {
                    return BadRequest("Le département spécifié n'existe pas.");
                }
            }

            // Mettre à jour les propriétés de l'employé
            existingEmploye.Nom = employeDTO.Nom;
            existingEmploye.Prenom = employeDTO.Prenom;
            existingEmploye.Email = employeDTO.Email;
            if (!string.IsNullOrEmpty(employeDTO.MotDePasse))
            {
                existingEmploye.MotDePasse = employeDTO.MotDePasse;
            }
            existingEmploye.DateEmbauche = employeDTO.DateEmbauche;
            existingEmploye.IdRole = employeDTO.IdRole;
            existingEmploye.IdDepartement = employeDTO.IdDepartement;

            await _employeService.UpdateEmploye(existingEmploye);
            return NoContent();
        }

        [HttpDelete("{matricule}")]
        public async Task<IActionResult> Delete(int matricule)
        {
            var employe = await _context.Employes.FindAsync(matricule);
            if (employe == null)
            {
                return NotFound("L'employé spécifié n'existe pas.");
            }

            await _employeService.DeleteEmploye(matricule);
            return NoContent();
        }
    }
}