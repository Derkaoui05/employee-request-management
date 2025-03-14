using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace gestion_demandes.Server.Data
{
    public class GestionDemandesContextFactory : IDesignTimeDbContextFactory<GestionDemandesContext>
    {
        public GestionDemandesContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<GestionDemandesContext>();
            optionsBuilder.UseSqlServer("Server=DERKAOUI05\\DERKAOUI05;Database=gestion_employe;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True");

            return new GestionDemandesContext(optionsBuilder.Options);
        }
    }
}
