using System;
using System.Collections.Generic;

namespace APIBD.Data;

public partial class TbFgt
{
    public int IdFgts { get; set; }

    public float? ValorFgts { get; set; }

    public DateOnly? DataAlteraçao { get; set; }
}
