

using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APIBD.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class Cargo : ControllerBase

{
    private readonly ICargo _cargo;

    public Cargo(ICargo cargo)
    {
        _cargo = cargo;
    }
    
    [HttpGet("BuscarFuncionarioCargo")]
  
    public async Task<ActionResult<TbCargo>> BuscarFuncionarioCargo( int IdCargo)
    {
        TbCargo cargo = await _cargo.BuscarFuncionarioCargo(IdCargo);
        return Ok(cargo);

    }
    
    [HttpGet("BuscarCargoGeral")]
  
    public async Task<ActionResult<List<TbCargo>>> BuscarCargoGeral([FromQuery] QueryCargo queryCargo)
    {
        try
        {
            List<TbCargo> cargos = await _cargo.BuscarCargoGeral(queryCargo);
            return Ok(cargos);
        }
        catch (Exception ex)
        {

            return StatusCode(500, $"Ocorreu um erro interno no servidor: {ex.Message}");
        }
    }
    
    [HttpPost("AdicionarFuncionarioCargo")]
    
    public async Task<ActionResult<TbCargo>> AdicionarFuncionarioCargo(
        [FromBody] TbCargo AdicionarCargo)
    {
        TbCargo cargo = await _cargo.AdicionarFuncionarioCargo(AdicionarCargo);

        return Ok(cargo);
    }
    
    [HttpPatch("AtualizarFuncionarioCargo")]
   
    public async Task<ActionResult<TbCargo>> AtualizarFuncionarioCargo (
        [FromBody] TbCargo AtualizarCargo)
    {
        TbCargo cargo = await _cargo.AtualizarFuncionarioCargo(AtualizarCargo);

        return Ok(cargo);
    }
}



