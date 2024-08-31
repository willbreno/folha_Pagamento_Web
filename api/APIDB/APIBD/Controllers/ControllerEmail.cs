
using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APIBD.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]

public class Email : ControllerBase
{

    private readonly IEmail _email;

    public Email(IEmail Email)
    {
        _email = Email;
    }
    
    [HttpGet("BuscarFuncionarioEmail")]
 
    public async Task<ActionResult> BuscarFuncionarioEmail( int FkMatricula)
    {
        TbEmail Email = await _email.BuscarFuncionarioEmail(FkMatricula);
        return Ok(Email);

    }
    
    [HttpPost("AdicionarFuncionarioEmail")]
    public async Task<ActionResult<TbEmail>> AdicionarFuncionarioEmail(
        [FromBody] TbEmail AdicionarEmail)
    {
        TbEmail Email = await _email.AdicionarFuncionarioEmail(AdicionarEmail);

        return Ok(Email);
    }
    
    [HttpPatch("AtualizarFuncionarioEmail")]
    public async Task<ActionResult<TbEmail>> AtualizarFuncionarioEmail (
        [FromBody] TbEmail AtualizarEmail)
    {
        TbEmail Email= await _email.AtualizarFuncionarioEmail(AtualizarEmail);

        return Ok(Email);
    }
    
}
