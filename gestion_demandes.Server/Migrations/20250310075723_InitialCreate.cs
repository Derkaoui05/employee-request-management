using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gestion_demandes.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    IdRole = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomRole = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NiveauAcces = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.IdRole);
                });

            migrationBuilder.CreateTable(
                name: "TypesDemande",
                columns: table => new
                {
                    IdType = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypesDemande", x => x.IdType);
                });

            migrationBuilder.CreateTable(
                name: "Demandes",
                columns: table => new
                {
                    IdDemande = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatriculeDemandeur = table.Column<int>(type: "int", nullable: false),
                    MatriculeEmploye = table.Column<int>(type: "int", nullable: false),
                    IdType = table.Column<int>(type: "int", nullable: false),
                    DateDebut = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DureeJournaliere = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SoldeConge = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Commentaire = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Statut = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateCreation = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Demandes", x => x.IdDemande);
                    table.ForeignKey(
                        name: "FK_Demandes_TypesDemande_IdType",
                        column: x => x.IdType,
                        principalTable: "TypesDemande",
                        principalColumn: "IdType",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Departements",
                columns: table => new
                {
                    IdDepartement = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomDepartement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatriculeManager = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departements", x => x.IdDepartement);
                });

            migrationBuilder.CreateTable(
                name: "Employes",
                columns: table => new
                {
                    Matricule = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prenom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MotDePasse = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateEmbauche = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdRole = table.Column<int>(type: "int", nullable: false),
                    IdDepartement = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employes", x => x.Matricule);
                    table.ForeignKey(
                        name: "FK_Employes_Departements_IdDepartement",
                        column: x => x.IdDepartement,
                        principalTable: "Departements",
                        principalColumn: "IdDepartement");
                    table.ForeignKey(
                        name: "FK_Employes_Roles_IdRole",
                        column: x => x.IdRole,
                        principalTable: "Roles",
                        principalColumn: "IdRole",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Equipes",
                columns: table => new
                {
                    IdEquipe = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomEquipe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdDepartement = table.Column<int>(type: "int", nullable: false),
                    MatriculeResponsable = table.Column<int>(type: "int", nullable: false),
                    EquipeParentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipes", x => x.IdEquipe);
                    table.ForeignKey(
                        name: "FK_Equipes_Departements_IdDepartement",
                        column: x => x.IdDepartement,
                        principalTable: "Departements",
                        principalColumn: "IdDepartement",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Equipes_Employes_MatriculeResponsable",
                        column: x => x.MatriculeResponsable,
                        principalTable: "Employes",
                        principalColumn: "Matricule",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Equipes_Equipes_EquipeParentId",
                        column: x => x.EquipeParentId,
                        principalTable: "Equipes",
                        principalColumn: "IdEquipe");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Demandes_IdType",
                table: "Demandes",
                column: "IdType");

            migrationBuilder.CreateIndex(
                name: "IX_Demandes_MatriculeDemandeur",
                table: "Demandes",
                column: "MatriculeDemandeur");

            migrationBuilder.CreateIndex(
                name: "IX_Demandes_MatriculeEmploye",
                table: "Demandes",
                column: "MatriculeEmploye");

            migrationBuilder.CreateIndex(
                name: "IX_Departements_MatriculeManager",
                table: "Departements",
                column: "MatriculeManager");

            migrationBuilder.CreateIndex(
                name: "IX_Employes_IdDepartement",
                table: "Employes",
                column: "IdDepartement");

            migrationBuilder.CreateIndex(
                name: "IX_Employes_IdRole",
                table: "Employes",
                column: "IdRole");

            migrationBuilder.CreateIndex(
                name: "IX_Equipes_EquipeParentId",
                table: "Equipes",
                column: "EquipeParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipes_IdDepartement",
                table: "Equipes",
                column: "IdDepartement");

            migrationBuilder.CreateIndex(
                name: "IX_Equipes_MatriculeResponsable",
                table: "Equipes",
                column: "MatriculeResponsable");

            migrationBuilder.AddForeignKey(
                name: "FK_Demandes_Employes_MatriculeDemandeur",
                table: "Demandes",
                column: "MatriculeDemandeur",
                principalTable: "Employes",
                principalColumn: "Matricule",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Demandes_Employes_MatriculeEmploye",
                table: "Demandes",
                column: "MatriculeEmploye",
                principalTable: "Employes",
                principalColumn: "Matricule",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Departements_Employes_MatriculeManager",
                table: "Departements",
                column: "MatriculeManager",
                principalTable: "Employes",
                principalColumn: "Matricule");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Departements_Employes_MatriculeManager",
                table: "Departements");

            migrationBuilder.DropTable(
                name: "Demandes");

            migrationBuilder.DropTable(
                name: "Equipes");

            migrationBuilder.DropTable(
                name: "TypesDemande");

            migrationBuilder.DropTable(
                name: "Employes");

            migrationBuilder.DropTable(
                name: "Departements");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
