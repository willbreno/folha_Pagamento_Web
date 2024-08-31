using System;
using System.Collections.Generic;

namespace APIBD.Data;

public partial class TbEmail
{
    public int FkMatricula { get; set; }

    public string? Email { get; set; }
}
