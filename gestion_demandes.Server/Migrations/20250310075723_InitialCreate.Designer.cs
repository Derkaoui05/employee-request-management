﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using gestion_demandes.Server.Data;

#nullable disable

namespace gestion_demandes.Server.Migrations
{
    [DbContext(typeof(GestionDemandesContext))]
    [Migration("20250310075723_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("gestion_demandes.Server.Models.Demande", b =>
                {
                    b.Property<int>("IdDemande")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdDemande"));

                    b.Property<string>("Commentaire")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateCreation")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateDebut")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateFin")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("DureeJournaliere")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("IdType")
                        .HasColumnType("int");

                    b.Property<int>("MatriculeDemandeur")
                        .HasColumnType("int");

                    b.Property<int>("MatriculeEmploye")
                        .HasColumnType("int");

                    b.Property<decimal>("SoldeConge")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Statut")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdDemande");

                    b.HasIndex("IdType");

                    b.HasIndex("MatriculeDemandeur");

                    b.HasIndex("MatriculeEmploye");

                    b.ToTable("Demandes");
                });

            modelBuilder.Entity("gestion_demandes.Server.Models.Departement", b =>
                {
                    b.Property<int>("IdDepartement")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdDepartement"));

                    b.Property<int?>("MatriculeManager")
                        .HasColumnType("int");

                    b.Property<string>("NomDepartement")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdDepartement");

                    b.HasIndex("MatriculeManager");

                    b.ToTable("Departements");
                });

            modelBuilder.Entity("gestion_demandes.Server.Models.Employe", b =>
                {
                    b.Property<int>("Matricule")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Matricule"));

                    b.Property<DateTime>("DateEmbauche")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("IdDepartement")
                        .HasColumnType("int");

                    b.Property<int>("IdRole")
                        .HasColumnType("int");

                    b.Property<string>("MotDePasse")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prenom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Matricule");

                    b.HasIndex("IdDepartement");

                    b.HasIndex("IdRole");

                    b.ToTable("Employes");
                });

            modelBuilder.Entity("gestion_demandes.Server.Models.Equipe", b =>
                {
                    b.Property<int>("IdEquipe")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdEquipe"));

                    b.Property<int?>("EquipeParentId")
                        .HasColumnType("int");

                    b.Property<int>("IdDepartement")
                        .HasColumnType("int");

                    b.Property<int>("MatriculeResponsable")
                        .HasColumnType("int");

                    b.Property<string>("NomEquipe")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdEquipe");

                    b.HasIndex("EquipeParentId");

                    b.HasIndex("IdDepartement");

                    b.HasIndex("MatriculeResponsable");

                    b.ToTable("Equipes");
                });

            modelBuilder.Entity("gestion_demandes.Server.Models.Role", b =>
                {
                    b.Property<int>("IdRole")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdRole"));

                    b.Property<int>("NiveauAcces")
                        .HasColumnType("int");

                    b.Property<string>("NomRole")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdRole");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("gestion_demandes.Server.Models.TypeDemande", b =>
                {
                    b.Property<int>("IdType")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdType"));

                    b.Property<string>("NomType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdType");

                    b.ToTable("TypesDemande");
                });

            modelBuilder.Entity("gestion_demandes.Server.Models.Demande", b =>
                {
                    b.HasOne("gestion_demandes.Server.Models.TypeDemande", "TypeDemande")
                        .WithMany()
                        .HasForeignKey("IdType")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("gestion_demandes.Server.Models.Employe", "Demandeur")
                        .WithMany()
                        .HasForeignKey("MatriculeDemandeur")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("gestion_demandes.Server.Models.Employe", "Employe")
                        .WithMany()
                        .HasForeignKey("MatriculeEmploye")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Demandeur");

                    b.Navigation("Employe");

                    b.Navigation("TypeDemande");
                });

            modelBuilder.Entity("gestion_demandes.Server.Models.Departement", b =>
                {
                    b.HasOne("gestion_demandes.Server.Models.Employe", "Manager")
                        .WithMany()
                        .HasForeignKey("MatriculeManager");

                    b.Navigation("Manager");
                });

            modelBuilder.Entity("gestion_demandes.Server.Models.Employe", b =>
                {
                    b.HasOne("gestion_demandes.Server.Models.Departement", "Departement")
                        .WithMany("Employes")
                        .HasForeignKey("IdDepartement");

                    b.HasOne("gestion_demandes.Server.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("IdRole")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departement");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("gestion_demandes.Server.Models.Equipe", b =>
                {
                    b.HasOne("gestion_demandes.Server.Models.Equipe", "EquipeParent")
                        .WithMany()
                        .HasForeignKey("EquipeParentId");

                    b.HasOne("gestion_demandes.Server.Models.Departement", "Departement")
                        .WithMany()
                        .HasForeignKey("IdDepartement")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("gestion_demandes.Server.Models.Employe", "Responsable")
                        .WithMany()
                        .HasForeignKey("MatriculeResponsable")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departement");

                    b.Navigation("EquipeParent");

                    b.Navigation("Responsable");
                });

            modelBuilder.Entity("gestion_demandes.Server.Models.Departement", b =>
                {
                    b.Navigation("Employes");
                });
#pragma warning restore 612, 618
        }
    }
}
