using APIBD.Data;
using APIBD.Models;

namespace APIBD.Interface
{
    public interface IToken
    {
        Task<TbFuncionario> GerarToken(UsuariosModel usuario);
    }
}
