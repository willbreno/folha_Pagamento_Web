using APIBD.Data;
using APIBD.Interface;
using APIBD.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIBD.Repositorios
{
    public class TokenRepositorio : IToken
    {
        private readonly BdFolhaContext _dbContext;

        public TokenRepositorio(BdFolhaContext ConectDB)
        {
            _dbContext = ConectDB;
        }

        public async Task<TbFuncionario> GerarToken(UsuariosModel usuario)
        {
            var RecebeUsuario = await _dbContext.TbFuncionarios.FirstOrDefaultAsync(x => x.Matricula == usuario.Matricula);
            if (RecebeUsuario != null && RecebeUsuario.Matricula == usuario.Matricula && RecebeUsuario.Senha == usuario.Senha)
            {
                if (RecebeUsuario.FkStatus == 1)
                {



                }

                //else if (RecebeUsuario.FkStatus != 1)
                //{

                //    throw new Exception("O usuario informado esta Desativado, Por gentileza entre em contato com Setor de Recursos Humanos ");

                //}

            }
            return (RecebeUsuario);
        }
    }
}
