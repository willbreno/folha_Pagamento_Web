using APIBD.Data;
using APIBD.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APIBD.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]

public class INSS : ControllerBase
{

    private readonly IINSS _inss;

    public INSS(IINSS inss)
    {
        _inss = inss;
    }


    [HttpGet("BuscarIndiceINSS")]
    public async Task<ActionResult<List<TbInss>>> BuscarIndiceINSS()
    {
        try
        {
            List<TbInss> inssList = await _inss.BuscarIndiceINSS();
            return Ok(inssList);
        }
        catch (Exception ex)
        {
            // Lidar com exceções, se necessário
            return StatusCode(500, "Erro interno do servidor");
        }
    }

    [HttpPatch("AtualziarIndiceINSS")]
    public async Task<ActionResult<TbFgt>> AtualziarIndiceINSS(
        [FromBody] TbInss AtualizarINSS)
    {
        TbInss inss = await _inss.AtualziarIndiceINSS(AtualizarINSS);

        return Ok(inss);

    }
}
    