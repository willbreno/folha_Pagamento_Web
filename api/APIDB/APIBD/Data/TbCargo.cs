using System;
using System.Collections.Generic;

namespace APIBD.Data;

public partial class TbCargo
{
    public int IdCargo { get; set; }

    public string? NomeCargo { get; set; }

    public float Salario { get; set; }

    public int? CargaHoraria { get; set; }

    public int? FkDepartamento { get; set; }
}
