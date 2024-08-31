using APIBD.Data;

namespace APIBD.Interface;

public interface IINSS

{

    Task<List<TbInss>> BuscarIndiceINSS();

    Task<TbInss> AtualziarIndiceINSS(TbInss AtualizarINSS); 

}