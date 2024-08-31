using APIBD.Data;
using APIBD.Interface;
using APIBD.Repositorios;
using APIBD.Repositorios.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APIBD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class ConsultaFolhaDetalhada : ControllerBase
    {

        private readonly IRelatorioFuncionarios _relatoriofuncrepositorio;

        public ConsultaFolhaDetalhada(IRelatorioFuncionarios relatorioFuncionariosrepositorio)
        {

            _relatoriofuncrepositorio = relatorioFuncionariosrepositorio;

        }

        [HttpGet("ConsultaFolhaDetalhadaGeral")]

        public async Task<ActionResult<List<TbFechamento>>> RelatorioFuncionario([FromQuery] QuerryHoleriteFuncionario consulta)

        {
            try
            {
                List<TbFechamento> funcrelatorio = await _relatoriofuncrepositorio.RelatorioFuncionario(consulta);
                return Ok(funcrelatorio);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Ocorreu um erro interno no servidor: {ex.Message}");
            }
        }

        [HttpGet("ConsultaFolhaDetalhadaindividual")]

        public async Task<ActionResult<List<TbFechamento>>> RelatorioFuncionarioPorMatricula([FromQuery] TbFechamento matricula)
        {
            try
            {
                List<TbFechamento> matricularelatorio = await _relatoriofuncrepositorio.RelatorioFuncionarioPorMatricula(matricula);
                return Ok(matricularelatorio);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocorreu um erro interno no servidor: {ex.Message}");
            }


        }
    }
}
