using System;
using System.Text.Json.Serialization;

namespace gestion_demandes.Server.DTOs
{
    public class DemandeDTO
    {
        public int? IdDemande { get; set; }

        public int Matricule { get; set; }

        public int IdType { get; set; }

        public DateTime DateDebut { get; set; }

        public DateTime DateFin { get; set; }

        public string? Details { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Statut { get; set; } = "En attente";

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? DateCreation { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? DateMiseAJour { get; set; }
    }
}