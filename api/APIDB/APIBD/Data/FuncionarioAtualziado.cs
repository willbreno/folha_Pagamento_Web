namespace APIBD.Data;

public class FuncionarioAtualizado
{
    public TbFuncionario Funcionario { get; set; }
    public TbEmail FuncionarioEmail { get; set; }
    public TbTelefone FuncionarioTelefone { get; set; }

    public TbEndereço FuncionarioEndereco { get; set; }
}