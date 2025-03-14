using gestion_demandes.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace gestion_demandes.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartementController : ControllerBase
    {
        private readonly DepartementService _departementService;

        public DepartementController(DepartementService departementService)
        {
            _departementService = departementService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var departements = await _departementService.GetAllDepartements();
            return Ok(departements);
        }
    }
}
