using APIBD.Data;

namespace APIBD.Interface
{
    public interface IRelatorioFolhaDetalhada
    {

        Task<List<TbFuncionario>> Obtermatricula(TbFuncionario puxarmatricula);
        Task ChamarStoredProcedureParaUsuariosAtivos();

        Task ChamarStoredProcedureParaUsuarioPorMatricula(int matriculas);



    }
}
