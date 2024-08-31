using APIBD.Data;
using APIBD.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APIBD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]


    public class RelatorioEmpGeral : ControllerBase
    {

        private readonly IConsultaFolhaEmp _consultaemp;

        public RelatorioEmpGeral(IConsultaFolhaEmp rconsultaemp)
        {

            _consultaemp = rconsultaemp;

        }


        [HttpGet("RelatorioGeralEmp")]

        public async Task<ActionResult<List<TbFechamentoemp>>> RelatorioGeralEmp([FromQuery] QuerryFolhaemp consulta)

        {
            try

            {
                List<TbFechamentoemp> relatorio = await _consultaemp.RelatorioGeralEmp(consulta);
                return Ok(relatorio);
            }

            catch (Exception ex)
            {

                return StatusCode(514, $"Ocorreu um erro interno no servidor: {ex.Message}");
            }
        }

    }


}



    