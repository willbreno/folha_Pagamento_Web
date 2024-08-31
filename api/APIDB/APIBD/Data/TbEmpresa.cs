using System;
using System.Collections.Generic;

namespace APIBD.Data;

public partial class TbEmpresa
{
    public int IdEmpresa { get; set; }

    public string Nome { get; set; } = null!;

    public string Cnpj { get; set; } = null!;
}
