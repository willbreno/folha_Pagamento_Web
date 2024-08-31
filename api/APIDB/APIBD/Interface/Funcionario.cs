

using APIBD.Data;
using APIBD.Models;

namespace APIBD.Repositorios.Interface
{
    public interface IFuncionario
    {
      
        Task<TbFuncionario> BuscarFuncionarioMatricula(int Matricula);
        
        Task<List<TbFuncionario>> BuscarFuncionarioGeral(QueryFuncionario QueryFuncionario);

        Task<TbFuncionario> AdicionarFuncionario(TbFuncionario Funcionario);
        
        Task<TbTelefone> AdicionarTelefone(TbTelefone funcionarioTelefone);
        
        Task<TbEmail> AdicionarEmail(TbEmail funcionarioEmail);
        
        Task<TbEndereço> AdicionarEndereco(TbEndereço funcionarioEndereco);

        Task<TbFuncionario> AtualizarFuncionario(TbFuncionario funcionarioAtualizado);

        Task<TbTelefone> AtualizarTelefone(TbTelefone funcionarioTelefone);
        
        Task<TbEmail> AtualizarEmail(TbEmail funcionarioEmail);
        
        Task<TbEndereço> AtualzarEndereco(TbEndereço funcionarioEndereco);
      
    }
}
