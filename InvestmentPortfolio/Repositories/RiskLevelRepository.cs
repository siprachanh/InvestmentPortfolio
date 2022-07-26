using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using InvestmentPortfolio.Models;
using InvestmentPortfolio.Utils;
using Microsoft.Data.SqlClient;
using System;

namespace InvestmentPortfolio.Repositories
{
    public class RiskLevelRepository : BaseRepository, IRiskLevelRepository
    {
        public RiskLevelRepository(IConfiguration configuration) : base(configuration) { }
        public List<RiskLevel> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                          FROM RiskLevel";
                    List<RiskLevel> risklevel = new List<RiskLevel>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        risklevel.Add(new RiskLevel()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                        });
                    }
                    reader.Close();
                    return risklevel;

                }

            }
        }

        public RiskLevel GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], Description
                          FROM RiskLevel
                         WHERE Id = @id;";
                    DbUtils.AddParameter(cmd, "@id", id);
                    RiskLevel risklevel = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        risklevel = new RiskLevel()
                        {
                            Id = DbUtils.GetInt(reader, ("Id")),
                            Name = DbUtils.GetString(reader, ("Name")),
                            Description = DbUtils.GetString(reader, ("Description")),
                        };

                    }
                    reader.Close();
                    return risklevel;

                }
            }
        }
    }
}
