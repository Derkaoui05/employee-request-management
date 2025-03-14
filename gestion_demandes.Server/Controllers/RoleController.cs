using gestion_demandes.Server.Services;
using Microsoft.AspNetCore.Mvc;


namespace gestion_demandes.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleService _roleService;

        public RoleController(RoleService roleService)
        {
            _roleService = roleService;
        }

        // GET: api/Role
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var roles = await _roleService.GetAllRoles();
            return Ok(roles);
        }
    }
}
