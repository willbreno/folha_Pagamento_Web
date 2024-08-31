
using APIBD.Data;
using APIBD.Models;
using APIBD.Repositorios;
using APIBD.Repositorios.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;


namespace APIBD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class Funcionario : ControllerBase
    {
        private readonly IFuncionario _funcionariosrepositorio;
        private readonly BdFolhaContext _dbContext;

        public Funcionario(IFuncionario funcionariosrepositorio, BdFolhaContext ConectDB)
        {
            _funcionariosrepositorio = funcionariosrepositorio;
            _dbContext = ConectDB;
        }


        [HttpGet("BuscarFuncionarioMatricula")]

        public async Task<ActionResult<TbFuncionario>> BuscarFuncionarioMatricula(int Matricula)
        {
            TbFuncionario funcionario = await _funcionariosrepositorio.BuscarFuncionarioMatricula(Matricula);
            return Ok(funcionario);

        }

        [HttpGet("BuscarFuncionarioGeral")]

        public async Task<ActionResult<List<TbFuncionario>>> BuscarFuncionarioGeral([FromQuery] QueryFuncionario funcionario)

        {
            try
            {
                List<TbFuncionario> funcionarios = await _funcionariosrepositorio.BuscarFuncionarioGeral(funcionario);
                return Ok(funcionarios);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Ocorreu um erro interno no servidor: {ex.Message}");
            }
        }

        [HttpPost("AdicionarFuncionario")]
        public async Task<ActionResult<TbFuncionario>> AdicionarFuncionario([FromBody] FuncionarioCompleto funcionarioCompleto)
        {
            if (funcionarioCompleto == null || 
                funcionarioCompleto.Funcionario == null ||
                funcionarioCompleto.FuncionarioEmail == null ||
                funcionarioCompleto.FuncionarioTelefone == null ||
                funcionarioCompleto.FuncionarioEndereco == null)
            {
                return BadRequest("Os objetos de funcionário, e-mail, telefone são obrigatórios.");
            }

            try
            {
                TbFuncionario func = await _funcionariosrepositorio.AdicionarFuncionario(funcionarioCompleto.Funcionario);

                funcionarioCompleto.FuncionarioEmail.FkMatricula = func.Matricula;
                await _funcionariosrepositorio.AdicionarEmail(funcionarioCompleto.FuncionarioEmail);

                funcionarioCompleto.FuncionarioTelefone.FkMatricula = func.Matricula;
                await _funcionariosrepositorio.AdicionarTelefone(funcionarioCompleto.FuncionarioTelefone);

                funcionarioCompleto.FuncionarioEndereco.FkMatricula = func.Matricula;
                await _funcionariosrepositorio.AdicionarEndereco(funcionarioCompleto.FuncionarioEndereco);

                return Ok(func);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocorreu um erro interno no servidor: {ex.Message}");
            }
        }


            [HttpPatch("AtualizarFuncionario")]
            public async Task<ActionResult<TbFuncionario>> AtualizarFuncionario(
                [FromBody] FuncionarioAtualizado funcionarioAtualizado)
            {

                TbFuncionario func =
                    await _funcionariosrepositorio.AtualizarFuncionario(funcionarioAtualizado.Funcionario);


                funcionarioAtualizado.FuncionarioEmail.FkMatricula = func.Matricula;
                await _funcionariosrepositorio.AtualizarEmail(funcionarioAtualizado.FuncionarioEmail);


                funcionarioAtualizado.FuncionarioTelefone.FkMatricula = func.Matricula;
                await _funcionariosrepositorio.AtualizarTelefone(funcionarioAtualizado.FuncionarioTelefone);

                funcionarioAtualizado.FuncionarioEndereco.FkMatricula = func.Matricula;
                await _funcionariosrepositorio.AtualzarEndereco(funcionarioAtualizado.FuncionarioEndereco);

                return Ok(func);
            }




        }
    }

