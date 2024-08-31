using APIBD.Controllers;
using APIBD.Data;
using APIBD.Interface;
using Microsoft.EntityFrameworkCore;

namespace APIBD.Repositorios
{
    public class ConsultaFolhaEmpRepositorio : IConsultaFolhaEmp
    {

        private readonly BdFolhaContext _dbContext;
        public ConsultaFolhaEmpRepositorio(BdFolhaContext ConectDB)
        {
            _dbContext = ConectDB;

        }


        public async Task<List<TbFechamentoemp>> RelatorioGeralEmp(QuerryFolhaemp consulta)
        {



            IQueryable<TbFechamentoemp> query = _dbContext.TbFechamentoemps;

            if (consulta.IdFechamentoEmpresa.HasValue)
            {
                query = query.Where(e => e.IdFechamentoEmpresa == consulta.IdFechamentoEmpresa);
            }


            if (consulta.DataFechamento.HasValue)
            {
                var dataFechamento = consulta.DataFechamento.Value;
                query = query.Where(e => e.DataFechamento.HasValue &&
                                         e.DataFechamento.Value.Day == dataFechamento.Day &&
                                         e.DataFechamento.Value.Month == dataFechamento.Month &&
                                         e.DataFechamento.Value.Year == dataFechamento.Year);
            }

            if (consulta.TotalTaxaIrrf.HasValue)
            {
                query = query.Where(e => e.TotalTaxaIrrf == consulta.TotalTaxaIrrf);
            }

            if (consulta.TotalTaxaInss.HasValue)
            {
                query = query.Where(e => e.TotalTaxaInss == consulta.TotalTaxaInss);
            }

            if (consulta.TotalTaxaFgts.HasValue)
            {
                query = query.Where(e => e.TotalTaxaFgts == consulta.TotalTaxaFgts);
            }

            if (consulta.SalarioBaseInss.HasValue)
            {
                query = query.Where(e => e.SalarioBaseInss == consulta.SalarioBaseInss);
            }


            if (consulta.SalarioBaseIrrf.HasValue)
            {
                query = query.Where(e => e.SalarioBaseIrrf == consulta.SalarioBaseIrrf);
            }

            if (consulta.SalarioBaseFgts.HasValue)
            {
                query = query.Where(e => e.SalarioBaseFgts == consulta.SalarioBaseFgts);
            }

            if (consulta.SalarioBrutoTotal.HasValue)
            {
                query = query.Where(e => e.SalarioBrutoTotal == consulta.SalarioBrutoTotal);
            }

            if (consulta.DescInss.HasValue)
            {
                query = query.Where(e => e.DescInss == consulta.DescInss);
            }

            if (consulta.DescTotal.HasValue)
            {
                query = query.Where(e => e.DescTotal == consulta.DescTotal);
            }

            if (consulta.Clt.HasValue)
            {
                query = query.Where(e => e.Clt == consulta.Clt);
            }

            if (consulta.FuncionariosAtivos.HasValue)
            {
                query = query.Where(e => e.FuncionariosAtivos == consulta.FuncionariosAtivos);
            }

            if (consulta.SalarioLiquido.HasValue)
            {
                query = query.Where(e => e.SalarioLiquido == consulta.SalarioLiquido);
            }

            if (consulta.ValorFgts.HasValue)
            {
                query = query.Where(e => e.ValorFgts == consulta.ValorFgts);
            }

            return await query.ToListAsync();
        }


    }
}



    



    