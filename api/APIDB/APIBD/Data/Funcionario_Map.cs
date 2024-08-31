using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace APIBD.Data;

public class Funcionario_Map : IEntityTypeConfiguration<TbFuncionario>
{
    public void Configure(EntityTypeBuilder<TbFuncionario> builder)
    {



        builder.HasKey(e => e.Matricula).HasName("PRIMARY");

        builder.ToTable("tb_funcionario");

        builder.HasIndex(e => e.Cpf, "CPF").IsUnique();

        builder.HasIndex(e => e.FkCargo, "FK_Cargo");

        builder.HasIndex(e => e.FkDepartamento, "FK_Departamento");

        builder.HasIndex(e => e.FkEmpresa, "FK_Empresa");

        builder.HasIndex(e => e.FkNvlAcesso, "FK_Status");

        builder.HasIndex(e => e.EstadoCivil, "Estado_Civil");

        builder.HasIndex(e => e.Nit, "NIT").IsUnique();

        builder.HasIndex(e => e.Pis, "PIS").IsUnique();

        builder.HasIndex(e => e.TituloEleitor, "Titulo_Eleitor").IsUnique();

        builder.Property(e => e.CarteiraTrabalho)
                .HasMaxLength(11)
                .IsFixedLength()
                .HasColumnName("Carteira_Trabalho");
        builder.Property(e => e.Cpf)
                .HasMaxLength(11)
                .IsFixedLength()
                .HasColumnName("CPF");
        builder.Property(e => e.DataAdmissao).HasColumnName("Data_Admissao");
        builder.Property(e => e.DataNascimento).HasColumnName("DATA_Nascimento");
        builder.Property(e => e.FkCargo).HasColumnName("FK_Cargo");
        builder.Property(e => e.FkDepartamento).HasColumnName("FK_Departamento");
        builder.Property(e => e.FkEmpresa).HasColumnName("FK_Empresa");
        builder.Property(e => e.FkNvlAcesso).HasColumnName("FK_NvlAcesso");
        builder.Property(e => e.ImagemFuncionario).HasColumnName("imagem_funcionario");
        builder.Property(e => e.Nit)
                .HasMaxLength(11)
                .IsFixedLength()
                .HasColumnName("NIT");
        builder.Property(e => e.Nome).HasMaxLength(100);
        builder.Property(e => e.Pis)
                .HasMaxLength(11)
                .IsFixedLength()
                .HasColumnName("PIS");
        builder.Property(e => e.Reservista).HasMaxLength(12);
        builder.Property(e => e.Rg)
                .HasMaxLength(9)
                .IsFixedLength()
                .HasColumnName("RG");
        builder.Property(e => e.Senha)
                .HasMaxLength(30)
                .UseCollation("utf8mb4_unicode_ci");
        builder.Property(e => e.Sexo)
                .HasMaxLength(1)
                .IsFixedLength();
        builder.Property(e => e.TituloEleitor)
            .HasMaxLength(12)
            .IsFixedLength()
            .HasColumnName("Titulo_Eleitor");

    }
}

