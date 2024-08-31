using System.ComponentModel.DataAnnotations;

namespace APIBD.Data;

public class QueryCargo
{
    [Key]
    public int? IdCargo { get; set; }

    public string? NomeCargo { get; set; }

    public float? Salario { get; set; }

    public int? CargaHoraria { get; set; }

    public int? FkDepartamento { get; set; }

}