
using APIBD.Data;

namespace APIBD.Repositorios.Interface;



    public interface IEndereco
    {
        Task<TbEndereço> BuscarFuncionarioEndereco (int FkMatricula);
        Task<TbEndereço> AtualizarFuncionarioEndereco (TbEndereço enderecoAtualizado);
        
        Task<TbEndereço> AdicionarFuncionarioEndereco(TbEndereço adicionarendereco);
    }
    




