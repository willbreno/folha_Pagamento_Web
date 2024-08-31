using APIBD.Data;

namespace APIBD.Controllers
{
    public interface IConsultaFolhaEmp
    {

        Task<List<TbFechamentoemp>> RelatorioGeralEmp(QuerryFolhaemp consulta);

        
    }
}
