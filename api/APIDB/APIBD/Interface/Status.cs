using APIBD.Data;

namespace APIBD.Repositorios.Interface;


    public interface IStatus
    {
        Task<TbStatus> BuscarFuncionarioStatus(int FkMatricula);

        Task<TbStatus> AtualizarFuncionarioStatus(TbStatus AtualizarStatus);
    }

