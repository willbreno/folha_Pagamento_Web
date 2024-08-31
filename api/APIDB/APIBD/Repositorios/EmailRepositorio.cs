using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.EntityFrameworkCore;

namespace APIBD.Repositorios;

public class EmailRepositorio :IEmail
{
    private readonly BdFolhaContext _dbContext;

    public EmailRepositorio(BdFolhaContext ConectDB)
    {
        _dbContext = ConectDB;
    }
    
    public async Task<TbEmail> BuscarFuncionarioEmail(int FkMatricula)

    {
        var Email = await _dbContext.TbEmails.FirstOrDefaultAsync(e => e.FkMatricula == FkMatricula);
        return Email;
    }    
    
    public async Task<TbEmail> AdicionarFuncionarioEmail(TbEmail AdicionarEmail)
    {
        await _dbContext.TbEmails.AddAsync(AdicionarEmail);
        await _dbContext.SaveChangesAsync();
        return AdicionarEmail;
    }
    
    public async Task<TbEmail> AtualizarFuncionarioEmail(TbEmail AtualizarEmail)
    {
        var Email = await _dbContext.TbEmails.FirstOrDefaultAsync(e => e.FkMatricula == AtualizarEmail.FkMatricula);

        if (Email != null)
        {
            Email.Email = AtualizarEmail.Email;
            _dbContext.TbEmails.Update(Email);
            _dbContext.SaveChanges();
            return Email;
        }
        else
        {
            throw new InvalidOperationException(
                $"Usuário para a Matrícula:{Email.FkMatricula} não foi encontrado no banco de dados ou a matrícula não corresponde.");
        }
    }
}




