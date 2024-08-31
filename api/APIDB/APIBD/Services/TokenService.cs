using APIBD.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using APIBD.Token;
using System.Data;

namespace APIBD.Services
{
    public class TokenService
    {
        public static object GenerateToken(UsuariosModel Usuario)
        {
            var key = Encoding.ASCII.GetBytes(Chave.Secret);
            var TokenConfig = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name,Usuario.Matricula.ToString() ),
               
                    // Adicione outras claims conforme necessário
                }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256),
            };

            var TokenHandler = new JwtSecurityTokenHandler();
            var Token = TokenHandler.CreateToken(TokenConfig);
            var tokenString = TokenHandler.WriteToken(Token);

            return new
            {
                token = tokenString
            };
        }
    }
}
