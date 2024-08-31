using APIBD.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Data;


namespace APIBD.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class CalculoFolhaEmp : ControllerBase
    {
        private readonly ICalculoFolhaEmp _calcempo;

        public CalculoFolhaEmp(ICalculoFolhaEmp calcempo)
        {
            _calcempo = calcempo;
        }


        [HttpPost("ChamarStoredProcedureParaUsuariosAtivos")]
        public async Task<IActionResult> ChamarStoredProcedureParaUsuariosAtivos([FromBody] ParametrosStoredProcedure parametros)
        {
            try
            {
                await ChamarStoredProcedure(parametros.Mes, parametros.Ano);
                return Ok("Stored procedure executada com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao executar a stored procedure: {ex.Message}");
            }
        }

        private async Task ChamarStoredProcedure(int mes, int ano)
        {
            using (MySqlConnection connection = new MySqlConnection("Server=localhost;Database=bd_folha;Uid=root;Pwd="))
            {
                await connection.OpenAsync();

                using (MySqlCommand cmd = new MySqlCommand())
                {
                    cmd.Connection = connection;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "CalculoFolhaEMP";

                    // Adicione parâmetros à stored procedure
                    cmd.Parameters.AddWithValue("p_Mes", mes);
                    cmd.Parameters.AddWithValue("p_Ano", ano);

                    await cmd.ExecuteNonQueryAsync();
                }
            }
        }
    }

    public class ParametrosStoredProcedure
    {
        public int Mes { get; set; }
        public int Ano { get; set; }
    }
}
