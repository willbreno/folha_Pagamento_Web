using APIBD.Data;
using APIBD.Interface;
using APIBD.Models;
using APIBD.Repositorios.Interface;
using APIBD.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace APIBD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IToken _token;
        private readonly ILogger<AuthController> _logger;
        private readonly BdFolhaContext _dbContext;

        public AuthController(IToken token, ILogger<AuthController> logger, BdFolhaContext ConectDB)
        {
            _token = token;
            _logger = logger;
            _dbContext = ConectDB;
        }

        [HttpPost]
        public async Task<ActionResult> GerarToken(UsuariosModel usuario)
        {
            _logger.LogInformation("Iniciando a geração de token...");


            TbFuncionario Login = await _token.GerarToken(usuario);


            if (Login != null && Login.Matricula == usuario.Matricula && Login.Senha == usuario.Senha)
            {

                if (Login.FkStatus != 1)
                {
                    var response_ = new
                    {
                        status = StatusCode(411, "Usuario Desativado"),
                        Token = "",
                        Usuario = ""
                    };

                    return Ok(response_);
                }
                var token = TokenService.GenerateToken(usuario);
                _logger.LogInformation("Token gerado com sucesso.");
                TbAcesso acessos = await _dbContext.TbAcessos.FirstOrDefaultAsync(c => c.IdAcesso == Login.FkAcesso);
                var response = new                
                {
                    status = StatusCode(200, "Login realizado com sucesso"),
                    Token = token,                    
                    Usuario = new
                    {
                        Matricula = Login.Matricula,
                        acesso = acessos
                    }
                };

                return Ok(response);
            }
            var responseErro = new
            {
                status = StatusCode(410, "Login e/ou senha Invalidos!!"),
                Token = "",
                Usuario = ""
            };

            return Ok(responseErro);
        }


    }
}

