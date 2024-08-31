using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class FGTS : ControllerBase
{

    private readonly IFGTS _fgts;

    public FGTS(IFGTS Fgts)
    {
        _fgts = Fgts;

    }
    
    [HttpGet("BuscarIndiceFGTS")]
    public async Task<ActionResult<List<TbFgt>>> BuscarIndiceFGTS()
    {
        try
        {
            TbFgt buscarFGTS = new TbFgt { IdFgts = 1 }; // Setar o valor desejado para IdFgts
            List<TbFgt> fgts = await _fgts.BuscarIndiceFGTS(buscarFGTS);
            return Ok(fgts);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Ocorreu um erro interno no servidor: {ex.Message}");
        }
    }
    
    [HttpPatch("AtualizarIndiceFGTS")]
    public async Task<ActionResult<TbFgt>> AtualizarIndiceFGTS (
        [FromBody] TbFgt AtualizarFGTS)
    {
        TbFgt fgts = await _fgts.AtualizarIndiceFGTS(AtualizarFGTS);

        return Ok(fgts);
    }
}