using gestion_demandes.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gestion_demandes.Server.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gestion_demandes.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypesDemandeController : ControllerBase
    {
        private readonly GestionDemandesContext _context;

        public TypesDemandeController(GestionDemandesContext context)
        {
            _context = context;
        }

        // GET: api/TypesDemande
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeDemande>>> GetTypesDemande()
        {
            return await _context.TypesDemande.ToListAsync();
        }

        // GET: api/TypesDemande/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeDemande>> GetTypeDemande(int id)
        {
            var typeDemande = await _context.TypesDemande.FindAsync(id);

            if (typeDemande == null)
            {
                return NotFound();
            }

            return typeDemande;
        }
    }
}