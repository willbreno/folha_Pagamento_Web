using APIBD.Data;
using APIBD.Interface;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System.Data;

namespace APIBD.Repositorios
{
    public class CalculoFolhaEmpRepositorio : ICalculoFolhaEmp
    {

        private readonly BdFolhaContext _dbContext;

        public CalculoFolhaEmpRepositorio(BdFolhaContext ConectDB)
        {
            _dbContext = ConectDB;
        }


        public async Task ChamarStoredProcedureParaUsuariosAtivos(int Mouth, int Year)
        {
            using (MySqlConnection connection = new MySqlConnection("Server=localhost;Database=bd_folha;Uid=root;Pwd="))
            {
                connection.Open();

                using (MySqlCommand cmd = new MySqlCommand())
                {
                    cmd.Connection = connection;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "CalculoFolhaEMP";

                    // Adicione parâmetros à stored procedure
                    cmd.Parameters.AddWithValue("p_Mes", Mouth);
                    cmd.Parameters.AddWithValue("p_Ano", Year);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}

