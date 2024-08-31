using APIBD.Data;

namespace APIBD.Repositorios.Interface;

public interface IEmail

{

    Task<TbEmail> BuscarFuncionarioEmail(int FkMatricula);

    Task<TbEmail> AdicionarFuncionarioEmail(TbEmail AdicionarEmail);

    Task<TbEmail> AtualizarFuncionarioEmail(TbEmail AtualizarEmail);
    
}