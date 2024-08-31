using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APIBD.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]

public class Acesso : ControllerBase

{
    
    private readonly IAcesso _acesso;

    public Acesso(IAcesso Acesso)
    {
        _acesso = Acesso;
    }
    
    [HttpGet("BuscarFuncionarioAcesso")]
 
    public async Task<ActionResult> BuscarFuncionarioAcesso( int IdAcesso)
    {
        TbAcesso Acesso = await _acesso.BuscarFuncionarioAcesso(IdAcesso);
        return Ok(Acesso);

    }   
    
    [HttpPatch("AtualizarFuncionarioAcesso")]

    public async Task<ActionResult<TbAcesso>> AtualizarFuncionarioAcesso (
        [FromBody] TbAcesso AtualizarAcesso)
    {
        TbAcesso Acesso= await _acesso.AtualizarFuncionarioAcesso(AtualizarAcesso);

        return Ok(Acesso);
    }
    
}
