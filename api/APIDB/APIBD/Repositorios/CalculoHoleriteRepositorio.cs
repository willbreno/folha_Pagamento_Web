using APIBD.Data;
using APIBD.Interface;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Microsoft.AspNetCore.Mvc;

namespace APIBD.Repositorios
{
    public class RelatorioFolhaDetalhadaRepositorio : IRelatorioFolhaDetalhada
    {
        private readonly BdFolhaContext _dbContext;

        public RelatorioFolhaDetalhadaRepositorio(BdFolhaContext ConectDB)
        {
            _dbContext = ConectDB;
        }


        public async Task<List<TbFuncionario>> Obtermatricula(TbFuncionario puxarmatricula)
        {
            // Certifique-se de que TbFuncionarios tem uma propriedade FkStatus
            var funcionariosAtivos = await _dbContext.TbFuncionarios
                .Where(e => e.FkStatus == 1)
                .ToListAsync();

            return funcionariosAtivos;
        }
        public async Task ChamarStoredProcedureParaUsuariosAtivos()
        {
            // Obtém todas as matrículas dos funcionários ativos
            var matriculasAtivas = await _dbContext.TbFuncionarios
                .Where(e => e.FkStatus == 1)
                .Select(e => e.Matricula)
                .ToListAsync();

            using (MySqlConnection connection = new MySqlConnection("Server=localhost;Database=bd_folha;Uid=root;Pwd="))
            {
                connection.Open();

                foreach (var matricula in matriculasAtivas)
                {
                    using (MySqlCommand cmd = new MySqlCommand())
                    {
                        cmd.Connection = connection;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "CalculoHolerite";  // Substitua pelo nome correto da sua stored procedure

                        // Adicione parâmetros, se necessário
                        cmd.Parameters.AddWithValue("@p_FK_Matricula", matricula);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }



        public async Task ChamarStoredProcedureParaUsuarioPorMatricula(int matricula)
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

