using APIBD.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIBD.Interface
{
    public interface IRelatorioFuncionarios
    {

        Task<List<TbFechamento>> RelatorioFuncionario(QuerryHoleriteFuncionario consulta);

        Task<List<TbFechamento>> RelatorioFuncionarioPorMatricula(TbFechamento matricula);
    }
}
