using APIBD.Data;
using APIBD.Repositorios;
using APIBD.Repositorios.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APIBD.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]

public class Telefone : ControllerBase
{
    private readonly ITelefone _telefone;

    public Telefone(ITelefone telefone)
    {
        _telefone = telefone;
    }
    
    [HttpGet("BuscarFuncionarioTelefone")]
    
    public async Task<ActionResult> BuscarFuncionarioTelefone( int FkMatricula)
    {
        TbTelefone Telefone = await _telefone.BuscarFuncionarioTelefone(FkMatricula);
        return Ok(Telefone);

    }
    
    [HttpGet("BuscarFunTelNumero")]
   
    public async Task<ActionResult<TbTelefone>> BuscarFunTelNumero( string Telefone)
    {
        TbTelefone telefone = await _telefone.BuscarFunTelNumero(Telefone);
        return Ok(telefone);

    }
    
    [HttpPost("AdicionarFuncionarioTelefone")]
   
    public async Task<ActionResult<TbTelefone>> AdicionarFuncionarioTelefone(
        [FromBody] TbTelefone AdicionarTelefone)
    {
        TbTelefone Telefone = await _telefone.AdicionarFuncionarioTelefone(AdicionarTelefone);

        return Ok(Telefone);
    }
    
    [HttpPatch("AtualizarFuncionarioTelefone")]
    
    public async Task<ActionResult<TbTelefone>> AtualizarFuncionarioCargo (
        [FromBody] TbTelefone AtualizarTelefone)
    {
        TbTelefone Telefone = await _telefone.AtualizarFuncionarioTelefone(AtualizarTelefone);

        return Ok(Telefone);
    }
    
}


    
    
    
   