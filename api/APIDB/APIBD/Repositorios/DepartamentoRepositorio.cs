
using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.EntityFrameworkCore;


public class DepartamentoRepositorio : IDepartamento
    {
        private readonly BdFolhaContext _dbContext; 
        
        public DepartamentoRepositorio(BdFolhaContext ConectDb)

        {

            _dbContext = ConectDb; 

        }

             public async Task<TbDepartamento> BuscarDepartamentoFuncionarios(int IdDepartamento)
             {
            var Departamento = await _dbContext.TbDepartamentos.FirstOrDefaultAsync(e => e.IdDepartamento == IdDepartamento);

             if (Departamento == null)
                 {
                 throw new InvalidOperationException($"departamento nao encontrado.");
                         }

                     return Departamento;
                 }


    public async Task<List<TbDepartamento>> BuscarTodososDepartamentoFuncionarios(QueryDepartamento Querydepartamento)
        {


            IQueryable<TbDepartamento> query = _dbContext.TbDepartamentos;

            if (Querydepartamento.IdDepartamento.HasValue)
            {
                query = query.Where(e => e.IdDepartamento == Querydepartamento.IdDepartamento);
            }


            if (!string.IsNullOrEmpty(Querydepartamento.Nome))
            {
                query = query.Where(e => e.Nome.Contains(Querydepartamento.Nome));
            }
            
            if (Querydepartamento.Status.HasValue)
            {
                query = query.Where(e => e.Status == Querydepartamento.Status);
            }

            return await query.ToListAsync();
        }
        
        public async Task<TbDepartamento> AdicionarDepartamentoFuncionario(TbDepartamento AdicionarDepartamento)
        {
            await _dbContext.TbDepartamentos.AddAsync(AdicionarDepartamento);
            await _dbContext.SaveChangesAsync();
            return AdicionarDepartamento;
        }
        
        public async Task<TbDepartamento> AtualizarDepartamentoFuncionario(TbDepartamento AtualizarDepartamento)
        {
            var Departamento = await _dbContext.TbDepartamentos.FirstOrDefaultAsync(e => e.IdDepartamento == AtualizarDepartamento.IdDepartamento);

            if (Departamento != null)
            {
                Departamento.IdDepartamento = AtualizarDepartamento.IdDepartamento;
                Departamento.Nome = AtualizarDepartamento.Nome;
                Departamento.Status = AtualizarDepartamento.Status;
               
                _dbContext.TbDepartamentos.Update(Departamento);
                _dbContext.SaveChanges();

                return Departamento;
            }
            else
            {
                throw new InvalidOperationException($"Usuário para a Matrícula:{AtualizarDepartamento.IdDepartamento = AtualizarDepartamento.IdDepartamento} não foi encontrado no banco de dados ou a matrícula não corresponde.");
            }
        }
    }

