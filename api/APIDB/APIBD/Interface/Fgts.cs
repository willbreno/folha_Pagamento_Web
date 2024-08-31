using APIBD.Data;

namespace APIBD.Repositorios.Interface;

public interface IFGTS
{
    Task<List<TbFgt>> BuscarIndiceFGTS(TbFgt BuscarFGTS);
    Task<TbFgt> AtualizarIndiceFGTS(TbFgt AtualizarFGTS);
}
