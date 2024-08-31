using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace APIBD.Repositorios;

public class StatusRepositorio : IStatus
{
    private readonly BdFolhaContext _dbContext;

    public StatusRepositorio(BdFolhaContext ConectDB)
    {
        _dbContext = ConectDB;
    }

    public async Task<TbStatus> BuscarFuncionarioStatus(int FkMatricula)

    {
        var StatuS = await _dbContext.TbStatuses.FirstOrDefaultAsync(e => e.FkMatricula == FkMatricula);
        return StatuS;
    }

    public async Task<TbStatus> AtualizarFuncionarioStatus(TbStatus AtualizarStatus)
    {
        var StatuS = await _dbContext.TbStatuses.FirstOrDefaultAsync(e => e.FkMatricula == AtualizarStatus.FkMatricula);

        if (StatuS != null)
        {

            StatuS.IdStatus = AtualizarStatus.IdStatus;
            StatuS.DataAlteracao = AtualizarStatus.DataAlteracao;
            _dbContext.TbStatuses.Update(StatuS);
            _dbContext.SaveChanges();
            return StatuS;
        }
        else
        {
            throw new InvalidOperationException(
                $"Usuário para a Matrícula:{StatuS.FkMatricula} não foi encontrado no banco de dados ou a matrícula não corresponde.");
        }
    }

}
