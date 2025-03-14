using gestion_demandes.Server.Models;
using Microsoft.EntityFrameworkCore;
namespace gestion_demandes.Server.Data
{
    public class GestionDemandesContext : DbContext
    {
        public GestionDemandesContext(DbContextOptions<GestionDemandesContext> options)
        : base(options) { }

        public DbSet<Employe> Employes { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Departement> Departements { get; set; }
        public DbSet<Equipe> Equipes { get; set; }
        public DbSet<Demande> Demandes { get; set; }
        public DbSet<TypeDemande> TypesDemande { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Demande>()
                .HasKey(d => d.IdDemande);
            modelBuilder.Entity<Departement>().HasKey(d => d.IdDepartement);
            modelBuilder.Entity<Employe>().HasKey(e => e.Matricule);
            modelBuilder.Entity<Role>().HasKey(r => r.IdRole);
            modelBuilder.Entity<Equipe>().HasKey(e => e.IdEquipe);
            modelBuilder.Entity<TypeDemande>().HasKey(t => t.IdType);

            modelBuilder.Entity<Employe>()
                .HasOne(e => e.Departement)
                .WithMany(d => d.Employes)
                .HasForeignKey(e => e.IdDepartement);

            modelBuilder.Entity<Departement>()
                .HasOne(d => d.Manager)
                .WithMany()
                .HasForeignKey(d => d.MatriculeManager);

            modelBuilder.Entity<Equipe>()
                .HasOne(e => e.EquipeParent)
                .WithMany()
                .HasForeignKey(e => e.EquipeParentId);
        }

    }
}
