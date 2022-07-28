using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using InvestmentPortfolio.Models;
using InvestmentPortfolio.Utils;
using Microsoft.Data.SqlClient;
using System;


namespace InvestmentPortfolio.Repositories
{
    public class SecurityRepository : BaseRepository, ISecurityRepository
    {
        public SecurityRepository(IConfiguration configuration) : base(configuration) { }

        public List<Security> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT s.Id AS SecurityId, s.Name AS SecurityName, s.TypeId As SecurityTypeId, s.Price FROM Security s";
                    List<Security> security = new List<Security>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        security.Add(new Security()
                        {
                            Id = DbUtils.GetInt(reader, "SecurityId"),
                            Name = DbUtils.GetString(reader, "SecurityName"),
                            TypeId = DbUtils.GetInt(reader, "SecurityTypeId"),
                            Price = reader.GetDecimal("Price"),
                        });
                    }
                    reader.Close();
                    return security;
                }
            }
        }
    }
}
        //Security Id, Name, TypeId, Price