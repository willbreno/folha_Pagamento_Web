using System.ComponentModel.DataAnnotations;

namespace APIBD.Data;

public class FuncionarioConsultaCompleto
{
    public TbFuncionario Funcionario { get; set; }

    public QueryFuncionario? QueryFuncionario { get; set; }



}