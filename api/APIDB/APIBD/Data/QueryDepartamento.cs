namespace APIBD.Data;
using System.ComponentModel.DataAnnotations;
public class QueryDepartamento
{
    [Key]
    public int? IdDepartamento { get; set; }

    public string? Nome { get; set; }

    public int? Status { get; set; }

}