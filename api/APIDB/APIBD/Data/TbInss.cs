using System;
using System.Collections.Generic;

namespace APIBD.Data;

public partial class TbInss
{
    public int IdInss { get; set; }

    public DateOnly? DataAtualizaçao { get; set; }

    public float? SalarioInicial { get; set; }

    public float? SalarioFinal { get; set; }

    public float? TaxaDesconto { get; set; }
}
