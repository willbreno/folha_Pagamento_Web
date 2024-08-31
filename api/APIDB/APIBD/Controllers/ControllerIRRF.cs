using APIBD.Data;
using APIBD.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APIBD.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]

public class IRRF : ControllerBase
{
    
    private readonly IIRRF _irrf;

    public IRRF(IIRRF irrf)
    {
        _irrf = irrf;

    }
    
    [HttpGet("BuscarIndiceIRRF")]
    public async Task<ActionResult<List<TbIrf>>> BuscarIndiceIRRF()
    {
        try
        {
            List<TbIrf> irrfList = await _irrf.BuscarIndiceIRRF();
            return Ok(irrfList);
        }
        catch (Exception )
        {
            // Lidar com exceções, se necessário
            return StatusCode(500, "Erro interno do servidor");
        }
    }
    
    [HttpPatch("AtualizarIndiceIRRF")]
    public async Task<ActionResult<TbFgt>> AtualizarIndiceIRRF (
        [FromBody] TbIrf AtualizarIRRF)
    {
        TbIrf irrf = await _irrf.AtualizarIndiceIRRF(AtualizarIRRF);

        return Ok(irrf);
    }
    
}