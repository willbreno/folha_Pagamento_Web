using APIBD.Data;

namespace APIBD.Repositorios.Interface;

public interface ITelefone
{
    Task<TbTelefone> BuscarFuncionarioTelefone(int FKMatricula);
    Task<TbTelefone> BuscarFunTelNumero(string telefone);
    Task<TbTelefone> AdicionarFuncionarioTelefone(TbTelefone AdicionarTelefone);
    
    Task<TbTelefone> AtualizarFuncionarioTelefone(TbTelefone AtualizarTelefone);
}