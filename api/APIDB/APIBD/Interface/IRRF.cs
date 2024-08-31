using APIBD.Data;

namespace APIBD.Interface;

public interface IIRRF
{
    Task<List<TbIrf>> BuscarIndiceIRRF();

    Task<TbIrf> AtualizarIndiceIRRF(TbIrf AtualizarIRRF);
}