using APIBD.Data;
using Microsoft.EntityFrameworkCore;

namespace APIBD.Repositorios.Interface;

public class EnderecoRepositorio : IEndereco
{
    private readonly BdFolhaContext _dbContext;

    public EnderecoRepositorio(BdFolhaContext ConectDB)
    {
        _dbContext = ConectDB;
    }

    public async Task<TbEndereço> BuscarFuncionarioEndereco(int FkMatricula)
    {
        var endereco = await _dbContext.TbEndereços.FirstOrDefaultAsync(e => e.FkMatricula == FkMatricula);
        return endereco;
    }

    public async Task<TbEndereço> AdicionarFuncionarioEndereco ( TbEndereço adicionarendereco )
    {
        await _dbContext.TbEndereços.AddAsync(adicionarendereco);
        await _dbContext.SaveChangesAsync();
        return adicionarendereco;
    }

    public async Task<TbEndereço> AtualizarFuncionarioEndereco ( TbEndereço enderecoAtualizado )

    {
        var endereco =
            await _dbContext.TbEndereços.FirstOrDefaultAsync(e => e.FkMatricula == enderecoAtualizado.FkMatricula);
        
        if ( endereco != null )
        {
           
            endereco.Cep = enderecoAtualizado.Cep;
            endereco.Rua = enderecoAtualizado.Rua;
            endereco.Numero = enderecoAtualizado.Numero;
            endereco.Bairro = enderecoAtualizado.Bairro;
            endereco.Cidade = enderecoAtualizado.Cidade;
            endereco.Uf = enderecoAtualizado.Uf;
            endereco.Complemento = enderecoAtualizado.Complemento;
            _dbContext.TbEndereços.Update(endereco);
            _dbContext.SaveChanges();
            return endereco;
            
        }
        else
        {
            throw new InvalidOperationException($"Usuário para a Matrícula:{enderecoAtualizado.FkMatricula} não foi encontrado no banco de dados ou a matrícula não corresponde.");
        }
    }
}



