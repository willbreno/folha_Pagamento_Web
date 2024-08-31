using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace APIBD.Services
{
    public class SwaggerTokenExpiredOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (operation.Security == null)
            {
                operation.Security = new List<OpenApiSecurityRequirement>();
            }

            var securityRequirements = new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new List<string>()
            }
        };

            operation.Security.Add(securityRequirements);

            if (context.ApiDescription.ActionDescriptor.EndpointMetadata.Any(em => em is AuthorizeAttribute))
            {
                // Adicione a mensagem de erro personalizada para token expirado
                operation.Responses.TryAdd("403", new OpenApiResponse
                {
                    Description = "Token Expirado",
                    Content = new Dictionary<string, OpenApiMediaType>
                {
                    { "application/json", new OpenApiMediaType() }
                }
                });
            }
        }
    }
}