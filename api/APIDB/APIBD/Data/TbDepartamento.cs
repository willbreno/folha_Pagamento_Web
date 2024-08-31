using System;
using System.Collections.Generic;

namespace APIBD.Data;

public partial class TbDepartamento
{
    public int IdDepartamento { get; set; }

    public string? Nome { get; set; }

    public int? Status { get; set; }
}
