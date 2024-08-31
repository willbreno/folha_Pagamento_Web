
using APIBD.Data;


namespace APIBD.Repositorios.Interface;

public interface IDepartamento
{

    Task<TbDepartamento> BuscarDepartamentoFuncionarios(int IdDepartamento);

    Task<List<TbDepartamento>> BuscarTodososDepartamentoFuncionarios(QueryDepartamento Querydepartamento);

    Task<TbDepartamento> AdicionarDepartamentoFuncionario(TbDepartamento AdicionarDepartamento);

    Task<TbDepartamento> AtualizarDepartamentoFuncionario(TbDepartamento AtualizarDepartamento); 

}