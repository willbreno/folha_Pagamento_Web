using APIBD.Data;
using APIBD.Interface;
using Microsoft.EntityFrameworkCore;

namespace APIBD.Repositorios
{
    public class RelatorioFuncionarioRepositorio : IRelatorioFuncionarios
    {

        private readonly BdFolhaContext _dbContext;
        public RelatorioFuncionarioRepositorio(BdFolhaContext ConectDB)
        {
            _dbContext = ConectDB;

        }



        public async Task<List<TbFechamento>> RelatorioFuncionario(QuerryHoleriteFuncionario consulta)
        {



            IQueryable<TbFechamento> query = _dbContext.TbFechamentos;

            if (consulta.IdHolerite.HasValue)
            {
                query = query.Where(e => e.IdHolerite == consulta.IdHolerite);
            }


            if (consulta.DataEmite.HasValue)
            {
                var data = consulta.DataEmite.Value;
                query = query.Where(e => e.DataEmite.HasValue ||
                 e.DataEmite.Value.Year == data.Year
                 ||e.DataEmite.Value.Month == data.Month ||
                                       e.DataEmite.Value.Day == data.Day);
            }

            if (consulta.FkMatricula.HasValue)
            {
                query = query.Where(e => e.FkMatricula == consulta.FkMatricula);
            }

            if (consulta.FkIdcargo.HasValue)
            {
                query = query.Where(e => e.FkIdcargo == consulta.FkIdcargo);
            }

            if (consulta.FkIrfdesconto.HasValue)
            {
                query = query.Where(e => e.FkIrfdesconto == consulta.FkIdcargo);
            }

            if (consulta.FkInssdesconto.HasValue)
            {
                query = query.Where(e => e.FkInssdesconto == consulta.FkInssdesconto);
            }


            if (consulta.SalarioFinal.HasValue)
            {
                query = query.Where(e => e.SalarioFinal == consulta.SalarioFinal);
            }

            if (consulta.ValorDescontoInss.HasValue)
            {
                query = query.Where(e => e.ValorDescontoInss == consulta.ValorDescontoInss);
            }

            if (consulta.ValorDescontoFgts.HasValue)
            {
                query = query.Where(e => e.ValorDescontoFgts == consulta.ValorDescontoFgts);
            }

            if (consulta.ValorDescontoIrf.HasValue)
            {
                query = query.Where(e => e.ValorDescontoIrf == consulta.ValorDescontoIrf);
            }

            if (consulta.SalarioBruto.HasValue)
            {
                query = query.Where(e => e.SalarioBruto == consulta.SalarioBruto);
            }

            return await query.ToListAsync();
        }

        public async Task<List<TbFechamento>> RelatorioFuncionarioPorMatricula(TbFechamento matricula)
        {
            try
            {
                var matricularelatorio = await _dbContext.TbFechamentos
                    .Where(e => e.FkMatricula == matricula.FkMatricula)
                    .ToListAsync();

                return matricularelatorio;
            }
            catch (Exception ex)
            {
                               
                throw new Exception("Ocorreu um erro interno no servidor. Código de erro: 506");
            }




        }
    }
}