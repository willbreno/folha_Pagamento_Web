using System;
using System.Collections.Generic;

namespace APIBD.Data;

public partial class TbFechamento
{
    public int IdHolerite { get; set; }

    public DateOnly? DataEmite { get; set; }

    public int? FkMatricula { get; set; }

    public int? FkIdcargo { get; set; }

    public int? FkIrfdesconto { get; set; }

    public int? FkInssdesconto { get; set; }

    public float? SalarioFinal { get; set; }

    public float? ValorDescontoInss { get; set; }

    public float? ValorDescontoFgts { get; set; }

    public float? ValorDescontoIrf { get; set; }

    public float? SalarioBruto { get; set; }
}
