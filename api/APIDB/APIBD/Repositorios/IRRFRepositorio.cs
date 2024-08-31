using APIBD.Data;
using APIBD.Interface;
using Microsoft.EntityFrameworkCore;

namespace APIBD.Repositorios;

public class IRRFRepositorio : IIRRF
{
    
    private readonly BdFolhaContext _dbContext;

    public IRRFRepositorio(BdFolhaContext ConectDb)
    {
        _dbContext = ConectDb; 
    }
    
    public async Task<List<TbIrf>> BuscarIndiceIRRF()
    {
        // Consulta para trazer todos os registros da tabela TB_IRF
        List<TbIrf> irrfList = await _dbContext.TbIrves.ToListAsync();

        return irrfList;
    }
    
    public async Task<TbIrf> AtualizarIndiceIRRF(TbIrf AtualizarIRRF)
    {
        var irrf = await _dbContext.TbIrves.FirstOrDefaultAsync(e => e.IdIrf == AtualizarIRRF.IdIrf);

        if (irrf != null)
        {
            irrf.IdIrf = AtualizarIRRF.IdIrf;
            irrf.DataAtualizaçao = AtualizarIRRF.DataAtualizaçao;
            irrf.SalarioInicial = AtualizarIRRF.SalarioInicial;
            irrf.SalarioFinal = AtualizarIRRF.SalarioFinal;
            irrf.TaxaDesconto = AtualizarIRRF.TaxaDesconto;

            _dbContext.TbIrves.Update(irrf);
            await _dbContext.SaveChangesAsync();
            return irrf;
        }
        else
        {
            throw new InvalidOperationException(
                $"ID:{irrf.IdIrf} não foi encontrado no banco de dados ou não corresponde.");
        }
    }
    
}


