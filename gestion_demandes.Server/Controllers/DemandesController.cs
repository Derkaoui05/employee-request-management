using gestion_demandes.Server.Models;
using gestion_demandes.Server.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gestion_demandes.Server.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace gestion_demandes.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemandesController : ControllerBase
    {
        private readonly GestionDemandesContext _context;

        public DemandesController(GestionDemandesContext context)
        {
            _context = context;
        }

        // GET: api/Demandes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Demande>>> GetDemandes()
        {
            return await _context.Demandes
                .Include(d => d.TypeDemande)
                .Include(d => d.Employe)
                .ToListAsync();
        }

        // GET: api/Demandes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Demande>> GetDemande(int id)
        {
            var demande = await _context.Demandes
                .Include(d => d.TypeDemande)
                .Include(d => d.Employe)
                .FirstOrDefaultAsync(d => d.IdDemande == id);

            if (demande == null)
            {
                return NotFound();
            }

            return demande;
        }

        // GET: api/Demandes/employe/5
        [HttpGet("employe/{matricule}")]
        public async Task<ActionResult<IEnumerable<Demande>>> GetDemandesByEmploye(int matricule)
        {
            var demandes = await _context.Demandes
                .Include(d => d.TypeDemande)
                .Where(d => d.Matricule == matricule)
                .ToListAsync();

            return demandes;
        }

        // POST: api/Demandes
        [HttpPost]
        public async Task<ActionResult<Demande>> PostDemande(DemandeDTO demandeDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Vérifier si l'employé existe
                var employe = await _context.Employes.FindAsync(demandeDTO.Matricule);
                if (employe == null)
                {
                    return BadRequest($"L'employé avec le matricule {demandeDTO.Matricule} n'existe pas.");
                }

                // Vérifier si le type de demande existe
                var typeDemande = await _context.TypesDemande.FindAsync(demandeDTO.IdType);
                if (typeDemande == null)
                {
                    return BadRequest($"Le type de demande avec l'ID {demandeDTO.IdType} n'existe pas.");
                }

                // Créer une nouvelle demande
                var demande = new Demande
                {
                    Matricule = demandeDTO.Matricule,
                    IdType = demandeDTO.IdType,
                    DateDebut = demandeDTO.DateDebut,
                    DateFin = demandeDTO.DateFin,
                    Details = demandeDTO.Details ?? "",
                    Statut = demandeDTO.Statut ?? "En attente",
                    DateCreation = DateTime.Now,
                    DateMiseAJour = DateTime.Now
                };

                _context.Demandes.Add(demande);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetDemande), new { id = demande.IdDemande }, demande);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception lors de la création d'une demande: {ex}");
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }

        // PUT: api/Demandes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemande(int id, DemandeDTO demandeDTO)
        {
            if (id != demandeDTO.IdDemande)
            {
                return BadRequest("L'ID de la demande ne correspond pas.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var demande = await _context.Demandes.FindAsync(id);
            if (demande == null)
            {
                return NotFound("La demande spécifiée n'existe pas.");
            }

            // Mettre à jour les propriétés de la demande
            demande.IdType = demandeDTO.IdType;
            demande.DateDebut = demandeDTO.DateDebut;
            demande.DateFin = demandeDTO.DateFin;
            demande.Details = demandeDTO.Details;
            demande.Statut = demandeDTO.Statut;
            demande.DateMiseAJour = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemandeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Demandes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDemande(int id)
        {
            var demande = await _context.Demandes.FindAsync(id);
            if (demande == null)
            {
                return NotFound();
            }

            _context.Demandes.Remove(demande);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DemandeExists(int id)
        {
            return _context.Demandes.Any(e => e.IdDemande == id);
        }
    }
}