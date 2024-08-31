using APIBD.Data;
using APIBD.Repositorios;
using APIBD.Repositorios.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APIBD.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class Status : ControllerBase
{
    private readonly IStatus _status;

    public Status(IStatus Status)
    {
        _status = Status;
    }
    
    [HttpGet("BuscarFuncionarioStatus")]

    public async Task<ActionResult> BuscarFuncionarioStatus( int FkMatricula)
    {
        TbStatus Status = await _status.BuscarFuncionarioStatus(FkMatricula);
        return Ok(Status);

    }
    
    
    [HttpPatch("AtualizarFuncionarioTelefone")]
   
    public async Task<ActionResult<TbStatus>> AtualizarFuncionarioStatus (
        [FromBody] TbStatus AtualizarStatus)
    {
        TbStatus Status = await _status.AtualizarFuncionarioStatus(AtualizarStatus);

        return Ok(Status);
    }
    
}