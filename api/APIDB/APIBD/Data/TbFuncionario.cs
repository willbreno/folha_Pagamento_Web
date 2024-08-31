using System;
using System.Collections.Generic;

namespace APIBD.Data;

public partial class TbFuncionario
{
    public int Matricula { get; set; }

    public string Cpf { get; set; } = null!;

    public string Nome { get; set; } = null!;

    public DateOnly? DataNascimento { get; set; }

    public string? Sexo { get; set; }

    public string? Rg { get; set; }

    public string? CarteiraTrabalho { get; set; }

    public string Nit { get; set; } = null!;

    public string Pis { get; set; } = null!;

    public string? TituloEleitor { get; set; }

    public int? EstadoCivil { get; set; }

    public string? Reservista { get; set; }

    public string? Senha { get; set; }

    public DateOnly? DataAdmissao { get; set; }

    public int? FkDepartamento { get; set; }

    public int? FkCargo { get; set; }

    public int? FkEmpresa { get; set; }

    public int? FkNvlAcesso { get; set; }

    public string? ImagemFuncionario { get; set; }

    public int? FkStatus { get; set; }

    public int? FkAcesso { get; set; }
}
