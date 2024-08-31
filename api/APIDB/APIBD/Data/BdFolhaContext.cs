using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace APIBD.Data;

public partial class BdFolhaContext : DbContext
{
    public BdFolhaContext()
    {
    }

    public BdFolhaContext(DbContextOptions<BdFolhaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TbAcesso> TbAcessos { get; set; }

    public virtual DbSet<TbCargo> TbCargos { get; set; }

    public virtual DbSet<TbDepartamento> TbDepartamentos { get; set; }

    public virtual DbSet<TbEmail> TbEmails { get; set; }

    public virtual DbSet<TbEmpresa> TbEmpresas { get; set; }

    public virtual DbSet<TbEndereço> TbEndereços { get; set; }

    public virtual DbSet<TbFechamento> TbFechamentos { get; set; }

    public virtual DbSet<TbFechamentoemp> TbFechamentoemps { get; set; }

    public virtual DbSet<TbFgt> TbFgts { get; set; }

    public virtual DbSet<TbFuncionario> TbFuncionarios { get; set; }

    public virtual DbSet<TbInss> TbInsses { get; set; }

    public virtual DbSet<TbIrf> TbIrves { get; set; }

    public virtual DbSet<TbStatus> TbStatuses { get; set; }

    public virtual DbSet<TbTelefone> TbTelefones { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=bd_folha;uid=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.31-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("latin1_general_ci")
            .HasCharSet("latin1");

        modelBuilder.Entity<TbAcesso>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tb_acesso");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdAcesso).HasColumnName("id_Acesso");
            entity.Property(e => e.Nome)
                .HasMaxLength(25)
                .HasColumnName("nome");
        });

        modelBuilder.Entity<TbCargo>(entity =>
        {
            entity.HasKey(e => e.IdCargo).HasName("PRIMARY");

            entity
                .ToTable("tb_cargo")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.HasIndex(e => e.FkDepartamento, "Fk_Departamento");

            entity.Property(e => e.IdCargo).HasColumnName("ID_Cargo");
            entity.Property(e => e.CargaHoraria)
                .HasDefaultValueSql("'40'")
                .HasColumnName("Carga_Horaria");
            entity.Property(e => e.FkDepartamento).HasColumnName("Fk_Departamento");
            entity.Property(e => e.NomeCargo)
                .HasMaxLength(100)
                .HasColumnName("Nome_Cargo");
        });

        modelBuilder.Entity<TbDepartamento>(entity =>
        {
            entity.HasKey(e => e.IdDepartamento).HasName("PRIMARY");

            entity
                .ToTable("tb_departamento")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.Property(e => e.IdDepartamento).HasColumnName("ID_Departamento");
            entity.Property(e => e.Nome).HasMaxLength(100);
        });

        modelBuilder.Entity<TbEmail>(entity =>
        {
            entity.HasKey(e => e.FkMatricula).HasName("PRIMARY");

            entity
                .ToTable("tb_email")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.HasIndex(e => e.FkMatricula, "FK_Matricula");

            entity.Property(e => e.FkMatricula)
                .ValueGeneratedNever()
                .HasColumnName("FK_Matricula");
            entity.Property(e => e.Email).HasMaxLength(100);
        });

        modelBuilder.Entity<TbEmpresa>(entity =>
        {
            entity.HasKey(e => e.IdEmpresa).HasName("PRIMARY");

            entity
                .ToTable("tb_empresa")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.HasIndex(e => e.Cnpj, "CNPJ").IsUnique();

            entity.Property(e => e.IdEmpresa).HasColumnName("ID_Empresa");
            entity.Property(e => e.Cnpj)
                .HasMaxLength(14)
                .IsFixedLength()
                .HasColumnName("CNPJ");
            entity.Property(e => e.Nome).HasMaxLength(100);
        });

        modelBuilder.Entity<TbEndereço>(entity =>
        {
            entity.HasKey(e => e.FkMatricula).HasName("PRIMARY");

            entity
                .ToTable("tb_endereço")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.Property(e => e.FkMatricula)
                .ValueGeneratedNever()
                .HasColumnName("FK_Matricula");
            entity.Property(e => e.Bairro).HasMaxLength(100);
            entity.Property(e => e.Cep)
                .HasMaxLength(8)
                .IsFixedLength();
            entity.Property(e => e.Cidade).HasMaxLength(100);
            entity.Property(e => e.Complemento).HasMaxLength(50);
            entity.Property(e => e.Rua).HasMaxLength(100);
            entity.Property(e => e.Uf)
                .HasMaxLength(2)
                .IsFixedLength()
                .HasColumnName("UF");
        });

        modelBuilder.Entity<TbFechamento>(entity =>
        {
            entity.HasKey(e => e.IdHolerite).HasName("PRIMARY");

            entity
                .ToTable("tb_fechamento")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.HasIndex(e => e.FkIdcargo, "FK_IDCargo");

            entity.HasIndex(e => e.FkInssdesconto, "FK_INSSDesconto");

            entity.HasIndex(e => e.FkMatricula, "FK_Matricula");

            entity.Property(e => e.IdHolerite).HasColumnName("ID_Holerite");
            entity.Property(e => e.DataEmite).HasColumnName("DATA_Emite");
            entity.Property(e => e.FkIdcargo).HasColumnName("FK_IDCargo");
            entity.Property(e => e.FkInssdesconto).HasColumnName("FK_INSSDesconto");
            entity.Property(e => e.FkIrfdesconto).HasColumnName("FK_IRFDesconto");
            entity.Property(e => e.FkMatricula).HasColumnName("FK_Matricula");
            entity.Property(e => e.SalarioBruto).HasColumnName("Salario_Bruto");
            entity.Property(e => e.SalarioFinal).HasColumnName("Salario_Final");
            entity.Property(e => e.ValorDescontoFgts).HasColumnName("Valor_DescontoFGTS");
            entity.Property(e => e.ValorDescontoInss).HasColumnName("Valor_DescontoINSS");
            entity.Property(e => e.ValorDescontoIrf).HasColumnName("Valor_DescontoIRF");
        });

        modelBuilder.Entity<TbFechamentoemp>(entity =>
        {
            entity.HasKey(e => e.IdFechamentoEmpresa).HasName("PRIMARY");

            entity
                .ToTable("tb_fechamentoemp")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.HasIndex(e => e.FkEmpresa, "Fk_Empresa");

            entity.Property(e => e.IdFechamentoEmpresa).HasColumnName("ID_FechamentoEmpresa");
            entity.Property(e => e.Clt).HasColumnName("CLT");
            entity.Property(e => e.DataFechamento).HasColumnName("DATA_Fechamento");
            entity.Property(e => e.DescInss).HasColumnName("Desc_INSS");
            entity.Property(e => e.DescIrrf).HasColumnName("Desc_IRRF");
            entity.Property(e => e.DescTotal).HasColumnName("Desc_Total");
            entity.Property(e => e.FkEmpresa).HasColumnName("Fk_Empresa");
            entity.Property(e => e.FuncionariosAtivos).HasColumnName("Funcionarios_Ativos");
            entity.Property(e => e.SalarioBaseFgts).HasColumnName("SalarioBase_FGTS");
            entity.Property(e => e.SalarioBaseInss).HasColumnName("SalarioBase_INSS");
            entity.Property(e => e.SalarioBaseIrrf).HasColumnName("SalarioBase_IRRF");
            entity.Property(e => e.SalarioLiquido).HasColumnName("Salario_Liquido");
            entity.Property(e => e.TotalTaxaFgts).HasColumnName("Total_TaxaFGTS");
            entity.Property(e => e.TotalTaxaInss).HasColumnName("Total_TaxaINSS");
            entity.Property(e => e.TotalTaxaIrrf).HasColumnName("Total_TaxaIRRF");
            entity.Property(e => e.ValorFgts).HasColumnName("Valor_FGTS");
        });

        modelBuilder.Entity<TbFgt>(entity =>
        {
            entity.HasKey(e => e.IdFgts).HasName("PRIMARY");

            entity
                .ToTable("tb_fgts")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.Property(e => e.IdFgts)
                .ValueGeneratedNever()
                .HasColumnName("ID_FGTS");
            entity.Property(e => e.DataAlteraçao).HasColumnName("DATA_Alteraçao");
            entity.Property(e => e.ValorFgts).HasColumnName("Valor_FGTS");
        });

        modelBuilder.Entity<TbFuncionario>(entity =>
        {
            entity.HasKey(e => e.Matricula).HasName("PRIMARY");

            entity
                .ToTable("tb_funcionario")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.HasIndex(e => e.Cpf, "CPF").IsUnique();

            entity.HasIndex(e => e.FkAcesso, "FKAcesso");

            entity.HasIndex(e => e.FkStatus, "FKStatus");

            entity.HasIndex(e => e.FkCargo, "FK_Cargo");

            entity.HasIndex(e => e.FkDepartamento, "FK_Departamento");

            entity.HasIndex(e => e.FkEmpresa, "FK_Empresa");

            entity.HasIndex(e => e.FkNvlAcesso, "FK_Status");

            entity.HasIndex(e => e.Nit, "NIT").IsUnique();

            entity.HasIndex(e => e.Pis, "PIS").IsUnique();

            entity.HasIndex(e => e.TituloEleitor, "Titulo_Eleitor").IsUnique();

            entity.Property(e => e.CarteiraTrabalho)
                .HasMaxLength(11)
                .IsFixedLength()
                .HasColumnName("Carteira_Trabalho");
            entity.Property(e => e.Cpf)
                .HasMaxLength(11)
                .IsFixedLength()
                .HasColumnName("CPF");
            entity.Property(e => e.DataAdmissao).HasColumnName("Data_Admissao");
            entity.Property(e => e.DataNascimento).HasColumnName("DATA_Nascimento");
            entity.Property(e => e.FkAcesso).HasColumnName("FK_Acesso");
            entity.Property(e => e.FkCargo).HasColumnName("FK_Cargo");
            entity.Property(e => e.FkDepartamento).HasColumnName("FK_Departamento");
            entity.Property(e => e.FkEmpresa).HasColumnName("FK_Empresa");
            entity.Property(e => e.FkNvlAcesso).HasColumnName("FK_NvlAcesso");
            entity.Property(e => e.FkStatus).HasColumnName("FK_Status");
            entity.Property(e => e.ImagemFuncionario).HasColumnName("imagem_funcionario");
            entity.Property(e => e.Nit)
                .HasMaxLength(11)
                .IsFixedLength()
                .HasColumnName("NIT");
            entity.Property(e => e.Nome).HasMaxLength(100);
            entity.Property(e => e.Pis)
                .HasMaxLength(11)
                .IsFixedLength()
                .HasColumnName("PIS");
            entity.Property(e => e.Reservista).HasMaxLength(12);
            entity.Property(e => e.Rg)
                .HasMaxLength(9)
                .IsFixedLength()
                .HasColumnName("RG");
            entity.Property(e => e.Senha)
                .HasMaxLength(30)
                .UseCollation("utf8mb4_unicode_ci");
            entity.Property(e => e.Sexo)
                .HasMaxLength(1)
                .IsFixedLength();
            entity.Property(e => e.TituloEleitor)
                .HasMaxLength(12)
                .IsFixedLength()
                .HasColumnName("Titulo_Eleitor");
        });

        modelBuilder.Entity<TbInss>(entity =>
        {
            entity.HasKey(e => e.IdInss).HasName("PRIMARY");

            entity
                .ToTable("tb_inss")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.Property(e => e.IdInss).HasColumnName("ID_INSS");
            entity.Property(e => e.DataAtualizaçao).HasColumnName("Data_Atualizaçao");
            entity.Property(e => e.SalarioFinal).HasColumnName("Salario_Final");
            entity.Property(e => e.SalarioInicial).HasColumnName("Salario_Inicial");
            entity.Property(e => e.TaxaDesconto).HasColumnName("Taxa_Desconto");
        });

        modelBuilder.Entity<TbIrf>(entity =>
        {
            entity.HasKey(e => e.IdIrf).HasName("PRIMARY");

            entity
                .ToTable("tb_irf")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.Property(e => e.IdIrf).HasColumnName("ID_IRF");
            entity.Property(e => e.DataAtualizaçao).HasColumnName("Data_Atualizaçao");
            entity.Property(e => e.SalarioFinal).HasColumnName("Salario_Final");
            entity.Property(e => e.SalarioInicial).HasColumnName("Salario_Inicial");
            entity.Property(e => e.TaxaDesconto).HasColumnName("Taxa_Desconto");
        });

        modelBuilder.Entity<TbStatus>(entity =>
        {
            entity.HasKey(e => e.FkMatricula).HasName("PRIMARY");

            entity
                .ToTable("tb_status")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.Property(e => e.FkMatricula)
                .ValueGeneratedNever()
                .HasColumnName("Fk_Matricula");
            entity.Property(e => e.DataAlteracao).HasColumnName("Data_Alteracao");
            entity.Property(e => e.IdStatus).HasColumnName("Id_Status");
        });

        modelBuilder.Entity<TbTelefone>(entity =>
        {
            entity.HasKey(e => e.FkMatricula).HasName("PRIMARY");

            entity
                .ToTable("tb_telefone")
                .HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_0900_ai_ci");

            entity.Property(e => e.FkMatricula)
                .ValueGeneratedNever()
                .HasColumnName("FK_Matricula");
            entity.Property(e => e.Telefone)
                .HasMaxLength(11)
                .IsFixedLength();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
