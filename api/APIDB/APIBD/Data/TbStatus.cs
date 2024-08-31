using System;
using System.Collections.Generic;

namespace APIBD.Data;

public partial class TbStatus
{
    public int? IdStatus { get; set; }

    public DateOnly? DataAlteracao { get; set; }

    public int FkMatricula { get; set; }
}
