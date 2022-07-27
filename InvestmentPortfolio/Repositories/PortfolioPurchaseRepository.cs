using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using InvestmentPortfolio.Models;
using InvestmentPortfolio.Utils;
using Microsoft.Data.SqlClient;
using System;

namespace InvestmentPortfolio.Repositories
{
    public class PortfolioPurchaseRepository : BaseRepository, IPortfolioPurchaseRepository
    {
        public PortfolioPurchaseRepository(IConfiguration configuration) : base(configuration) { }

        public List<PortfolioPurchase> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // PortfolioPurchase: Id, SecurityId, PortfolioId, AmountPurchase, PurchaseDate
                    cmd.CommandText = @"SELECT pp.SecurityId AS PortfolioPurchaseSecurityId, pp.Id AS PortfolioPurchaseId, s.Price, p.RiskLevelId AS PortfolioRiskLevelId, p.CashOnHand, p.Description, s.Id AS SecurityId,
                                        rl.Id AS RiskLevelId, rl.Name AS RiskLevelName, rl.Description AS RiskLevelDescription, s.Name AS SecurityName, s.TypeId, s.Price, p.Id, p.UserId, up.Id AS UserProfileId, up.FirebaseUserId, up.Email, pp.AmountPurchase, pp.PurchaseDate AS Date
                                        FROM PortfolioPurchase pp                             
                                        LEFT JOIN Security s ON s.Id = pp.SecurityId
                                        LEFT JOIN Portfolio p ON p.Id = pp.PortfolioId 
                                        LEFT JOIN RiskLevel rl ON rl.Id = p.RiskLevelId
                                        LEFT JOIN UserProfile up ON p.UserId = up.Id";

                    var portfolioPurchases = new List<PortfolioPurchase>();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            portfolioPurchases.Add(new PortfolioPurchase()
                            {
                                Id = DbUtils.GetInt(reader, "PortfolioPurchaseId"),
                                SecurityId = DbUtils.GetInt(reader, "PortfolioPurchaseSecurityId"),
                                Security = new Security()
                                {
                                    Id = DbUtils.GetInt(reader, "SecurityId"),
                                    Name = DbUtils.GetString(reader, "SecurityName"),
                                    TypeId = DbUtils.GetInt(reader, "TypeId"),
                                    Price = reader.GetDecimal("Price"),
                                },
                                PortfolioId = DbUtils.GetInt(reader, "Id"),
                                Portfolio = new Portfolio()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    RiskLevelId = DbUtils.GetInt(reader, "PortfolioRiskLevelId"),
                                    RiskLevel = new RiskLevel()
                                    {
                                        Id = DbUtils.GetInt(reader, "RiskLevelId"),
                                        Name = DbUtils.GetString(reader, "RiskLevelName"),
                                        Description = DbUtils.GetString(reader, "RiskLevelDescription"),
                                    },
                                    CashOnHand = reader.GetDecimal("CashOnHand"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    UserProfile = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserProfileId"),
                                        FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                        Email = DbUtils.GetString(reader, "Email"),

                                    },
                                    Description = DbUtils.GetString(reader, "Description"),
                                },
                                AmountPurchase = DbUtils.GetInt(reader, "AmountPurchase"),

                                PurchaseDate = DbUtils.GetDateTime(reader, "Date"),
                            });
                        };

                    }
                    return portfolioPurchases;

                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM PortfolioPurchase WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Add(PortfolioPurchase portfoliopurchase)
        {
            throw new NotImplementedException();
        }

        public void Update(PortfolioPurchase portfoliopurchase)
        {
            throw new NotImplementedException();
        }
    }
}
        

  
