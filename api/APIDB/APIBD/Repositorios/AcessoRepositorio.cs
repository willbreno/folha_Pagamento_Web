using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.EntityFrameworkCore;

namespace APIBD.Repositorios;

public class AcessoRepositorio : IAcesso
{
    private readonly BdFolhaContext _dbContext;

    public AcessoRepositorio(BdFolhaContext ConectDB)
    {
        _dbContext = ConectDB;
    }
    
    public async Task<TbAcesso> BuscarFuncionarioAcesso(int IdAcesso)

    {
        var Acesso = await _dbContext.TbAcessos.FirstOrDefaultAsync(e => e.IdAcesso == IdAcesso);
        return Acesso;
    }    

    
    public async Task<TbAcesso> AtualizarFuncionarioAcesso(TbAcesso AtualizarAcesso)
    {
        var Acesso = await _dbContext.TbAcessos.FirstOrDefaultAsync(e => e.IdAcesso == AtualizarAcesso.IdAcesso);

        if (AtualizarAcesso != null)
        {
            Acesso.IdAcesso = AtualizarAcesso.IdAcesso;
            _dbContext.TbAcessos.Update(AtualizarAcesso);
            _dbContext.SaveChanges();
            return AtualizarAcesso;
        }
        else
        {
            throw new InvalidOperationException(
                $"Usuário para a Matrícula:{Acesso.IdAcesso} não foi encontrado no banco de dados ");
        }
    }
}
    
