using APIBD.Data;
using APIBD.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System.Data;

namespace APIBD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]


    public class RelatorioFolhaDetalhada : ControllerBase
    {
        private readonly IRelatorioFolhaDetalhada _calcholerite;
        private readonly BdFolhaContext _dbContext;
        public RelatorioFolhaDetalhada(IRelatorioFolhaDetalhada calcholerite, BdFolhaContext ConectDB)
        {
            _calcholerite = calcholerite;
            _dbContext = ConectDB;
        }



        [HttpGet("FolhaDetalhadaGeral")]
        public async Task<IActionResult> ExecutarStoredProcedureParaUsuariosAtivos()
        {
            try
            {
                await _calcholerite.ChamarStoredProcedureParaUsuariosAtivos();
                return Ok("Stored procedure executada com sucesso para usuários ativos.");
            }
            catch (Exception ex)
            {
                return StatusCode(666, $"Erro ao executar stored procedure: {ex.Message}");
            }
        }

        [HttpGet("CalcularPorMatricula/{matricula}")]
        public async Task<IActionResult> CalcularPorMatricula(int matricula)
        {
            try
            {
                await ChamarStoredProcedureParaUsuarioPorMatricula(matricula);
                return Ok($"Holerite calculado com sucesso para a matrícula {matricula}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao calcular holerite: {ex.Message}");
            }
        }

        private async Task ChamarStoredProcedureParaUsuarioPorMatricula(int matricula)
        {
            using (MySqlConnection connection = new MySqlConnection("Server=localhost;Database=bd_folha;Uid=root;Pwd="))
            {
                await connection.OpenAsync();

                var funcionario = await _dbContext.TbFuncionarios.FirstOrDefaultAsync(e => e.Matricula == matricula);

                if (funcionario != null)
                {
                    using (MySqlCommand cmd = new MySqlCommand())
                    {
                        cmd.Connection = connection;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "CalculoHolerite";
                        cmd.Parameters.AddWithValue("@p_FK_Matricula", matricula);

                        await cmd.ExecuteNonQueryAsync();
                    }
                }
                else
                {
                    throw new InvalidOperationException($"Matrícula {matricula} não encontrada.");
                }
            }
        }
    }
}