using System;
using System.Collections.Generic;

namespace APIBD.Data;

public partial class TbEndereço
{
    public int FkMatricula { get; set; }

    public string? Cep { get; set; }

    public string? Rua { get; set; }

    public int? Numero { get; set; }

    public string? Bairro { get; set; }

    public string? Cidade { get; set; }

    public string? Uf { get; set; }

    public string? Complemento { get; set; }
}
