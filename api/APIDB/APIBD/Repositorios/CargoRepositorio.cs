


using APIBD.Data;
using APIBD.Repositorios.Interface;
using Microsoft.EntityFrameworkCore;


namespace APIBD.Repositorios;

public class CargoRepositorio : ICargo
{
    private readonly BdFolhaContext _dbContext;

    public CargoRepositorio(BdFolhaContext ConectDB)
    {
        _dbContext = ConectDB;
    }

    public async Task<TbCargo> BuscarFuncionarioCargo(int idcargo)
    {
        var Cargo = await _dbContext.TbCargos.FirstOrDefaultAsync(e => e.IdCargo == idcargo);
        return Cargo;
    }
    
    public async Task<List<TbCargo>> BuscarCargoGeral(QueryCargo queryCargo)
    {
            
            
        IQueryable<TbCargo> query = _dbContext.TbCargos;

        if (queryCargo.Salario.HasValue)
        {
            query = query.Where(e => e.Salario == queryCargo.Salario.Value);
        }


        if (!string.IsNullOrEmpty(queryCargo.NomeCargo))
        {
            query = query.Where(e => e.NomeCargo.Contains(queryCargo.NomeCargo));
        }

        if (queryCargo.IdCargo.HasValue)
        {
            query = query.Where(e => e.IdCargo == queryCargo.IdCargo);
        }
            
        if (queryCargo.CargaHoraria.HasValue)
        {
            query = query.Where(e => e.CargaHoraria == queryCargo.CargaHoraria);
        }

        if (queryCargo.FkDepartamento.HasValue)
        {
            query = query.Where(e => e.FkDepartamento == queryCargo.FkDepartamento);
        }

        return await query.ToListAsync();
    }

    public async Task<TbCargo> AdicionarFuncionarioCargo(TbCargo AdicionarCargo)
    {
        await _dbContext.TbCargos.AddAsync(AdicionarCargo);
        await _dbContext.SaveChangesAsync();
        return AdicionarCargo;
    }

    public async Task<TbCargo> AtualizarFuncionarioCargo(TbCargo AtualizarCargo)

    {
        var Cargo =
            await _dbContext.TbCargos.FirstOrDefaultAsync(e => e.IdCargo == AtualizarCargo.IdCargo);

        if (Cargo != null)
        {
            
            Cargo.FkDepartamento = AtualizarCargo.FkDepartamento;
            Cargo.NomeCargo = AtualizarCargo.NomeCargo;
            Cargo.Salario = AtualizarCargo.Salario;
            Cargo.CargaHoraria = AtualizarCargo.CargaHoraria;
            _dbContext.TbCargos.Update(Cargo);
            _dbContext.SaveChanges();
            return Cargo;

        }
        else
        {
            throw new InvalidOperationException(
                $"Usuário para a Matrícula:{Cargo.IdCargo} não foi encontrado no banco de dados ou a matrícula não corresponde.");
        }
    }
}
