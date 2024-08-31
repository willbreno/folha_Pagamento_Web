using APIBD.Data;
using APIBD.Interface;
using Microsoft.EntityFrameworkCore;

namespace APIBD.Repositorios;

public class INSSRepositorio : IINSS
{
    
    private readonly BdFolhaContext _dbContext;

    public INSSRepositorio(BdFolhaContext ConectDb)
    {
        _dbContext = ConectDb; 
    }
    
    public async Task<List<TbInss>> BuscarIndiceINSS()
    {
        // Consulta para trazer todos os registros da tabela TB_IRF
        List<TbInss> inssList = await _dbContext.TbInsses.ToListAsync();

        return inssList;
    }
    
    public async Task<TbInss> AtualziarIndiceINSS(TbInss AtualizarINSS)
    {
        var inss = await _dbContext.TbInsses.FirstOrDefaultAsync(e => e.IdInss == AtualizarINSS.IdInss);

        if (inss != null)
        {
            inss.IdInss = AtualizarINSS.IdInss;
            inss.DataAtualizaçao = AtualizarINSS.DataAtualizaçao;
            inss.SalarioInicial = AtualizarINSS.SalarioInicial;
            inss.SalarioFinal = AtualizarINSS.SalarioFinal;
            inss.TaxaDesconto = AtualizarINSS.TaxaDesconto;

            _dbContext.TbInsses.Update(inss);
            await _dbContext.SaveChangesAsync();
            return inss;
        }
        else
        {
            throw new InvalidOperationException(
                $"ID:{inss.IdInss} não foi encontrado no banco de dados ou não corresponde.");
        }
    }
}