using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



namespace APIBD.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TokenValidationController : ControllerBase
    {
        [HttpGet("CheckToken")]
        [Authorize]
        public IActionResult CheckToken()
        {


            return Ok(new { Message = "Token válido" });
        }
    }

}
