

using APIBD.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIBD.Repositorios.Interface;

public interface ICargo
{
    Task<TbCargo> BuscarFuncionarioCargo(int IdCargo);
    
    Task<List<TbCargo>> BuscarCargoGeral(QueryCargo queryCargo);

    Task<TbCargo> AdicionarFuncionarioCargo(TbCargo AdicionarCargo);

    Task<TbCargo> AtualizarFuncionarioCargo(TbCargo AtualizarCargo); 
}
