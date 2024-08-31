
using APIBD.Data;
using APIBD.Repositorios;
using APIBD.Repositorios.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class Departamento : ControllerBase

{
    private readonly IDepartamento _departamentorepositorio;

    public Departamento(IDepartamento departamentorepositorio)
    {

        _departamentorepositorio = departamentorepositorio;

    }
    
    
    [HttpGet("BuscarDepartamentoFuncionario")]

    public async Task<ActionResult<TbDepartamento>> BuscarDepartamentoFuncionarios(int IdDepartamento)
    {
        TbDepartamento Departamento = await _departamentorepositorio.BuscarDepartamentoFuncionarios(IdDepartamento);
        return Ok(Departamento);

    }

    [HttpGet("BuscarTodososDepartamentoFuncionarios")]
    
    public async Task<ActionResult<List<TbDepartamento>>> BuscarTodososDepartamentoFuncionarios([FromQuery] QueryDepartamento Querydepartamento)
    {
        try
        {
            List<TbDepartamento> Departamento = await _departamentorepositorio.BuscarTodososDepartamentoFuncionarios(Querydepartamento);
            return Ok(Departamento);
        }
        catch (Exception ex)
        {

            return StatusCode(500, $"Ocorreu um erro interno no servidor: {ex.Message}");
        }
    }
    
    [HttpPost("AdicionarDepartamentoFuncionario")]
    public async Task<ActionResult<TbDepartamento>> AdicionarDepartamentoFuncionario([FromBody] TbDepartamento AdicionarDepartamento)
    {
        TbDepartamento departamento = await _departamentorepositorio.AdicionarDepartamentoFuncionario(AdicionarDepartamento);

        return Ok(departamento);
    }
    
    [HttpPatch("AtualizarDepartamentoFuncionario")]
    
    public async Task<ActionResult<TbDepartamento>> AtualizarDepartamentoFuncionario([FromBody] TbDepartamento AtualizarDepartamento)
    {
        TbDepartamento departamento = await _departamentorepositorio.AtualizarDepartamentoFuncionario(AtualizarDepartamento);

        return Ok(departamento);
    }

}
