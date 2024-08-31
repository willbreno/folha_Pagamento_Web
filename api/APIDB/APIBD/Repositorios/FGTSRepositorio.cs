using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.EntityFrameworkCore;

namespace APIBD.Repositorios;

public class FGTSRepositorio : IFGTS
{

    private readonly BdFolhaContext _dbContext;

    public FGTSRepositorio(BdFolhaContext ConectDb)
    {
        _dbContext = ConectDb; 
    }

    public async Task<List<TbFgt>> BuscarIndiceFGTS(TbFgt BuscarFGTS)
    {
        return await _dbContext.TbFgts.ToListAsync();
    }
    
    public async Task<TbFgt> AtualizarIndiceFGTS(TbFgt AtualizarFGTS)
    {
        var fgts = await _dbContext.TbFgts.FirstOrDefaultAsync(e => e.IdFgts == AtualizarFGTS.IdFgts);

        if (fgts != null)
        {
            fgts.IdFgts = AtualizarFGTS.IdFgts;
            fgts.ValorFgts = AtualizarFGTS.ValorFgts;
            fgts.DataAlteraçao = AtualizarFGTS.DataAlteraçao;

            _dbContext.TbFgts.Update(fgts);
            await _dbContext.SaveChangesAsync();
            return fgts;
        }
        else
        {
            throw new InvalidOperationException(
                $"Usuário para a Matrícula:{fgts.IdFgts} não foi encontrado no banco de dados ou a matrícula não corresponde.");
        }
    }

}
