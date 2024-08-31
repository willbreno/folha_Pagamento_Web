using APIBD.Controllers;
using APIBD.Data;
using APIBD.Interface;
using APIBD.Models;
using APIBD.Repositorios;
using APIBD.Repositorios.Interface;
using APIBD.Services;
using APIBD.Token;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Text;
using WebApi.Application.Swagger;

namespace APIBD
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Adiciona servi�os ao cont�iner.
            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

                

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
            });


            var key = Encoding.ASCII.GetBytes(Chave.Secret);

            builder.Services.AddAuthentication(x =>
            {


                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero,
                    ValidateLifetime = true,

                };

                x.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                            context.Response.Headers.Add("Token-Expired", "true");

                            // Remove o tratamento padrão para evitar o status 401
                            context.NoResult();

                            // Indica que a resposta foi tratada
                            context.Response.CompleteAsync();
                        }
                        return Task.CompletedTask;
                    }
                };

            });




            builder.Services.AddScoped<IFuncionario, FuncionariosRepositorio>();
            builder.Services.AddScoped<ITelefone, TelefoneRepositorio>();
            builder.Services.AddScoped<IStatus, StatusRepositorio>();
            builder.Services.AddScoped<ICargo, CargoRepositorio>();
            builder.Services.AddScoped<IEndereco, EnderecoRepositorio>();
            builder.Services.AddScoped<IEmail, EmailRepositorio>();
            builder.Services.AddScoped<IDepartamento, DepartamentoRepositorio>();
            builder.Services.AddScoped<IAcesso, AcessoRepositorio>();
            builder.Services.AddScoped<IFGTS, FGTSRepositorio>();
            builder.Services.AddScoped<IIRRF, IRRFRepositorio>();
            builder.Services.AddScoped<IINSS, INSSRepositorio>();
            builder.Services.AddScoped<IRelatorioFuncionarios, RelatorioFuncionarioRepositorio>();
            builder.Services.AddScoped<IRelatorioFolhaDetalhada,RelatorioFolhaDetalhadaRepositorio>();
            builder.Services.AddScoped<ICalculoFolhaEmp, CalculoFolhaEmpRepositorio>();
            builder.Services.AddScoped<IConsultaFolhaEmp, ConsultaFolhaEmpRepositorio>();
            builder.Services.AddScoped<TokenValidationController>();

            builder.Services.AddDbContext<BdFolhaContext>(options =>
            {
                options.UseMySql("Server=localhost;Database=bd_folha;Uid=root;Pwd=",
                    Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.31-mysql"));
            });

            builder.Services.AddTransient<IToken, TokenRepositorio>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "MyPolicy",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:8080")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            var app = builder.Build();


            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(builder =>
            {
                builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
