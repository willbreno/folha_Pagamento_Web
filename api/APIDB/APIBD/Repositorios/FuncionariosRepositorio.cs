
using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace APIBD.Repositorios
{
    public class FuncionariosRepositorio : IFuncionario
    {
        private readonly BdFolhaContext _dbContext;
        public FuncionariosRepositorio(BdFolhaContext ConectDB)
        {
            _dbContext = ConectDB;

        }

        


            public async Task<TbFuncionario> BuscarFuncionarioMatricula(int Matricula)
        {
            var funcionario = await _dbContext.TbFuncionarios.FirstOrDefaultAsync(e => e.Matricula == Matricula);

            if (funcionario == null)
            {
                throw new InvalidOperationException($"Usuário para a Matrícula:{Matricula} não foi encontrado no banco de dados.");
            }

            return funcionario;
        }

            public async Task<List<TbFuncionario>> BuscarFuncionarioGeral(QueryFuncionario QueryFuncionario)
        {

            

            IQueryable<TbFuncionario> query = _dbContext.TbFuncionarios;

            if (QueryFuncionario.Matricula.HasValue)
            {
                query = query.Where(e => e.Matricula == QueryFuncionario.Matricula);
            }


            if (!string.IsNullOrEmpty(QueryFuncionario.Cpf))
            {
                query = query.Where(e => e.Cpf.Contains(QueryFuncionario.Cpf));
            }

            if (!string.IsNullOrEmpty(QueryFuncionario.Nome))
            {
                query = query.Where(e => e.Nome.Contains(QueryFuncionario.Nome));
            }

            if (QueryFuncionario.DataNascimento.HasValue)
            {
                var dataNascimento = QueryFuncionario.DataNascimento.Value;
                query = query.Where(e => e.DataNascimento.HasValue &&
                                         e.DataNascimento.Value.Day == dataNascimento.Day &&
                                         e.DataNascimento.Value.Month == dataNascimento.Month &&
                                         e.DataNascimento.Value.Year == dataNascimento.Year);
            }

            if (!string.IsNullOrEmpty(QueryFuncionario.Sexo))
            {
                query = query.Where(e => e.Sexo.Contains(QueryFuncionario.Sexo));
            }

            if (!string.IsNullOrEmpty(QueryFuncionario.Rg))
            {
                query = query.Where(e => e.Rg.Contains(QueryFuncionario.Rg));
            }

            if (!string.IsNullOrEmpty(QueryFuncionario.CarteiraTrabalho))
            {
                query = query.Where(e => e.CarteiraTrabalho.Contains(QueryFuncionario.CarteiraTrabalho));
            }

            if (!string.IsNullOrEmpty(QueryFuncionario.Nit))
            {
                query = query.Where(e => e.Nit.Contains(QueryFuncionario.Nit));
            }

            if (!string.IsNullOrEmpty(QueryFuncionario.Pis))
            {
                query = query.Where(e => e.Pis.Contains(QueryFuncionario.Pis));
            }

            if (!string.IsNullOrEmpty(QueryFuncionario.TituloEleitor))
            {
                query = query.Where(e => e.TituloEleitor.Contains(QueryFuncionario.TituloEleitor));
            }

            if (QueryFuncionario.EstadoCivil.HasValue)
            {
                query = query.Where(e => e.EstadoCivil == QueryFuncionario.EstadoCivil);
            }


                if (!string.IsNullOrEmpty(QueryFuncionario.Reservista))
            {
                query = query.Where(e => e.Reservista.Contains(QueryFuncionario.Reservista));
            }


            if (QueryFuncionario.DataAdmissao.HasValue)
            {
                var dataAdmissao = QueryFuncionario.DataAdmissao.Value;
                query = query.Where(e => e.DataAdmissao.HasValue &&
                                         e.DataAdmissao.Value.Day == dataAdmissao.Day &&
                                         e.DataAdmissao.Value.Month == dataAdmissao.Month &&
                                         e.DataAdmissao.Value.Year == dataAdmissao.Year);
            }

            if (QueryFuncionario.FkDepartamento.HasValue)
            {
                query = query.Where(e => e.FkDepartamento == QueryFuncionario.FkDepartamento);
            }

            if (QueryFuncionario.FkCargo.HasValue)
            {
                query = query.Where(e => e.FkCargo == QueryFuncionario.FkCargo);
            }
  

            if (QueryFuncionario.FkStatus.HasValue)
            {
                query = query.Where(e => e.FkStatus == QueryFuncionario.FkStatus);
            }

            return await query.ToListAsync();
        }


       
            public async Task<TbFuncionario> AdicionarFuncionario(TbFuncionario funcionario)
            {
                await _dbContext.TbFuncionarios.AddAsync(funcionario);
                await _dbContext.SaveChangesAsync();
                return funcionario;
            }

            public async Task<TbEmail> AdicionarEmail(TbEmail funcionarioEmail)
            {
                await _dbContext.TbEmails.AddAsync(funcionarioEmail);
                await _dbContext.SaveChangesAsync();
                return funcionarioEmail;
            }
            
            public async Task<TbEndereço> AdicionarEndereco(TbEndereço funcionarioEndereco)
            {
                await _dbContext.TbEndereços.AddAsync(funcionarioEndereco);
                await _dbContext.SaveChangesAsync();
                return funcionarioEndereco;
            }
            public async Task<TbTelefone> AdicionarTelefone(TbTelefone funcionarioTelefone)
            {
                await _dbContext.TbTelefones.AddAsync(funcionarioTelefone);
                await _dbContext.SaveChangesAsync();
                return funcionarioTelefone;
            }
        

        public async Task<TbFuncionario> AtualizarFuncionario(TbFuncionario funcionarioAtualizado)
        {
            var funcionario = await _dbContext.TbFuncionarios.FirstOrDefaultAsync(e => e.Matricula == funcionarioAtualizado.Matricula);

            if (funcionario != null)
            {
                
                funcionario.Nome = funcionarioAtualizado.Nome;
                funcionario.Cpf = funcionarioAtualizado.Cpf;
                funcionario.DataNascimento = funcionarioAtualizado.DataNascimento;
                funcionario.Sexo = funcionarioAtualizado.Sexo;
                funcionario.Rg = funcionarioAtualizado.Rg;
                funcionario.CarteiraTrabalho = funcionarioAtualizado.CarteiraTrabalho;
                funcionario.Nit = funcionarioAtualizado.Nit;
                funcionario.Pis = funcionarioAtualizado.Pis;
                funcionario.TituloEleitor = funcionarioAtualizado.TituloEleitor;
                funcionario.EstadoCivil = funcionarioAtualizado.EstadoCivil;
                funcionario.Reservista = funcionarioAtualizado.Reservista;
                funcionario.Senha = funcionarioAtualizado.Senha;
                funcionario.DataAdmissao = funcionarioAtualizado.DataAdmissao;
                funcionario.FkDepartamento = funcionarioAtualizado.FkDepartamento;
                funcionario.FkCargo = funcionarioAtualizado.FkCargo;
                funcionario.FkEmpresa = funcionarioAtualizado.FkEmpresa;
                funcionario.FkNvlAcesso = funcionarioAtualizado.FkNvlAcesso;
                funcionario.FkStatus = funcionarioAtualizado.FkStatus;
                funcionario.FkAcesso = funcionarioAtualizado.FkAcesso;
                funcionario.ImagemFuncionario = funcionarioAtualizado.ImagemFuncionario;

                _dbContext.TbFuncionarios.Update(funcionario);
                _dbContext.SaveChanges();

                return funcionario;
            }
            else
            {
                throw new InvalidOperationException($"Usuário para a Matrícula:{funcionarioAtualizado.Matricula} não foi encontrado no banco de dados ou a matrícula não corresponde.");
            }
        }
        
        public async Task<TbEndereço> AtualzarEndereco(TbEndereço funcionarioEndereco)
        {
            var funcionario = await _dbContext.TbEndereços.FirstOrDefaultAsync(e => e.FkMatricula == funcionarioEndereco.FkMatricula);

            if (funcionario != null)
            {
                
                funcionario.FkMatricula = funcionarioEndereco.FkMatricula;
                funcionario.Bairro = funcionarioEndereco.Bairro;
                funcionario.Cep = funcionarioEndereco.Cep;
                funcionario.Uf = funcionarioEndereco.Uf;
                funcionario.Cidade = funcionarioEndereco.Cidade;
                funcionario.Rua = funcionarioEndereco.Rua;
                funcionario.Numero = funcionarioEndereco.Numero;
                funcionario.Complemento = funcionarioEndereco.Complemento;
                
                _dbContext.TbEndereços.Update(funcionario);
                _dbContext.SaveChanges();

                return funcionario;
            }
            else
            {
                throw new InvalidOperationException($"Usuário para a Matrícula:{funcionarioEndereco.FkMatricula} não foi encontrado no banco de dados ou a matrícula não corresponde.");
            }
        }
        public async Task<TbTelefone> AtualizarTelefone(TbTelefone funcionarioTelefone)
        {
            var funcionario = await _dbContext.TbTelefones.FirstOrDefaultAsync(e => e.FkMatricula == funcionarioTelefone.FkMatricula);

            if (funcionario != null)
            {
                
                funcionario.FkMatricula = funcionarioTelefone.FkMatricula;
                funcionario.Telefone = funcionarioTelefone.Telefone;
                

                _dbContext.TbTelefones.Update(funcionario);
                _dbContext.SaveChanges();

                return funcionario;
            }
            else
            {
                throw new InvalidOperationException($"Usuário para a Matrícula:{funcionarioTelefone.FkMatricula} não foi encontrado no banco de dados ou a matrícula não corresponde.");
            }
        }
        public async Task<TbEmail> AtualizarEmail(TbEmail funcionarioEmail)
        {
            var funcionario = await _dbContext.TbEmails.FirstOrDefaultAsync(e => e.FkMatricula == funcionarioEmail.FkMatricula);

            if (funcionario != null)
            {
                
                funcionario.FkMatricula = funcionarioEmail.FkMatricula;
                funcionario.Email = funcionarioEmail.Email;
                

                _dbContext.TbEmails.Update(funcionario);
                _dbContext.SaveChanges();

                return funcionario;
            }
            else
            {
                throw new InvalidOperationException($"Usuário para a Matrícula:{funcionarioEmail.FkMatricula} não foi encontrado no banco de dados ou a matrícula não corresponde.");
            }
        }
    }
    }