using APIBD.Data;

namespace APIBD.Repositorios.Interface;

public interface IAcesso
{
    Task<TbAcesso> BuscarFuncionarioAcesso(int IdAcesso);
    Task<TbAcesso> AtualizarFuncionarioAcesso(TbAcesso AtualizarAcesso);
}
