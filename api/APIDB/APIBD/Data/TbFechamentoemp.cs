using System;
using System.Collections.Generic;

namespace APIBD.Data;

public partial class TbFechamentoemp
{
    public int IdFechamentoEmpresa { get; set; }

    public DateOnly? DataFechamento { get; set; }

    public float TotalTaxaIrrf { get; set; }

    public float TotalTaxaInss { get; set; }

    public float TotalTaxaFgts { get; set; }

    public float SalarioBaseInss { get; set; }

    public float SalarioBaseIrrf { get; set; }

    public float SalarioBaseFgts { get; set; }

    public float SalarioBrutoTotal { get; set; }

    public float DescInss { get; set; }

    public float DescIrrf { get; set; }

    public float DescTotal { get; set; }

    public int Clt { get; set; }

    public int FuncionariosAtivos { get; set; }

    public float? SalarioLiquido { get; set; }

    public float? ValorFgts { get; set; }

    public int? FkEmpresa { get; set; }
}
