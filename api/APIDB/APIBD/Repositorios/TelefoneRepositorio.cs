using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.EntityFrameworkCore;

namespace APIBD.Repositorios;

public class TelefoneRepositorio : ITelefone
{
    private readonly BdFolhaContext _dbContext;

    public TelefoneRepositorio(BdFolhaContext ConectDb)
    {
        _dbContext = ConectDb;
    }
    
    public async Task<TbTelefone> BuscarFuncionarioTelefone(int FkMatricula)
    {
        var Telefone = await _dbContext.TbTelefones.FirstOrDefaultAsync(e => e.FkMatricula == FkMatricula);
        return Telefone;
    }
    
    public async Task<TbTelefone> BuscarFunTelNumero(string Telefone)
    {
        var telefone = await _dbContext.TbTelefones.FirstOrDefaultAsync(e => e.Telefone == Telefone);
        return telefone;
    }
    
    public async Task<TbTelefone> AdicionarFuncionarioTelefone(TbTelefone AdicionarTelefone)
    {
        await _dbContext.TbTelefones.AddAsync(AdicionarTelefone);
        await _dbContext.SaveChangesAsync();
        return AdicionarTelefone;
    }
    
    public async Task<TbTelefone> AtualizarFuncionarioTelefone(TbTelefone AtualizarTelefone)

    {
        var Telefone =
            await _dbContext.TbTelefones.FirstOrDefaultAsync(e => e.FkMatricula == AtualizarTelefone.FkMatricula);

        if (Telefone != null)
        {

            Telefone.FkMatricula = AtualizarTelefone.FkMatricula;
            Telefone.Telefone = AtualizarTelefone.Telefone;
            _dbContext.TbTelefones.Update(Telefone);
            _dbContext.SaveChanges();
            return Telefone;

        }
        else
        {
            throw new InvalidOperationException(
                $"Usuário para a Matrícula:{Telefone.FkMatricula} não foi encontrado no banco de dados ou a matrícula não corresponde.");
        }
    }
}
    


 