namespace APIBD.Controllers;
using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]
[ApiController]
[Authorize]
public class Endereço : ControllerBase
{
    private readonly IEndereco _EnderecoRepositorio;

    public Endereço(IEndereco enderecoRepositorio)
    {
        _EnderecoRepositorio = enderecoRepositorio;
    }

    [HttpGet("BuscarFuncionarioEndereco")]
   
    public async Task<ActionResult<TbEndereço>> BuscarFuncionarioEndereco( int FkMatricula)
    {
        TbEndereço endereço = await _EnderecoRepositorio.BuscarFuncionarioEndereco(FkMatricula);
        return Ok(endereço);

    }

    [HttpPost("AdicionarFuncionarioEndereco")]

    public async Task<ActionResult<TbEndereço>> AdicionarFuncionarioEndereco(
        [FromBody] TbEndereço enderecoAtualizado)
    {
        TbEndereço endereço = await _EnderecoRepositorio.AdicionarFuncionarioEndereco(enderecoAtualizado);

        return Ok(endereço);
    }

    [HttpPatch("AtualizarFuncionarioEndereco")]
    
    public async Task<ActionResult<TbEndereço>> AtualizarFuncionarioEndereco (
        [FromBody] TbEndereço adicionarendereco)
    {
        TbEndereço endereço = await _EnderecoRepositorio.AtualizarFuncionarioEndereco(adicionarendereco);

        return Ok(endereço);
    }
}
  

