using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using InvestmentPortfolio.Models;
using InvestmentPortfolio.Utils;
using Microsoft.Data.SqlClient;
using System;


namespace InvestmentPortfolio.Repositories
{

    public class PortfolioRepository : BaseRepository, IPortfolioRepository
    {
        public PortfolioRepository(IConfiguration configuration) : base(configuration) { }

        public List<Portfolio> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.RiskLevelId, p.CashOnHand, p.UserId, p.Description, 
                    rl.Id, rl.Name AS RiskLevelName, rl.Description AS RiskLevelDescription,
                    up.Id AS UserId, up.FirebaseUserId, up.Email
                    FROM Portfolio p
                    LEFT JOIN RiskLevel rl ON p.RiskLevelId = rl.Id
                    LEFT JOIN UserProfile up ON p.UserId = up.Id";
                    
                    //anything that's created inside using statement gets used and only exists within that context
                    var portfolios = new List<Portfolio>();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                       
                        while (reader.Read())
                        {
                            portfolios.Add(new Portfolio()
                            {
                                //DbUtils is a class created to simplify db interaction code, esp, when dealing with nullable values
                                Id = DbUtils.GetInt(reader, "Id"),
                                RiskLevelId = DbUtils.GetInt(reader, "RiskLevelId"),
                                RiskLevel = new RiskLevel()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "RiskLevelName"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                },
                                CashOnHand = reader.GetDecimal("CashOnHand"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    Email = DbUtils.GetString(reader, "Email"),

                                },
                                Description = DbUtils.GetString(reader, "Description"),

                                //FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            });
                        };

                    }
                    //code for getAll() method gets all the data needed with an iteration to the db
                    return portfolios;
                }
            }
        }
        public void Add(Portfolio portfolio)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Portfolio (RiskLevelId,CashOnHand, UserId, Description)
                    OUTPUT INSERTED.Id
                    VALUES(@RiskLevelId,  @CashOnHand, @UserId, @Description)";
                    DbUtils.AddParameter(cmd, "@RiskLevelId", portfolio.RiskLevelId);
                    DbUtils.AddParameter(cmd, "@CashOnHand", portfolio.CashOnHand);
                    DbUtils.AddParameter(cmd, "@UserId", portfolio.UserId);
                    DbUtils.AddParameter(cmd, "@Description", portfolio.Description);

                    portfolio.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Portfolio portfolio)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Portfolio
                    SET RiskLevelId = @RiskLevelId, 
                        CashOnHand = @CashOnHand,
                        UserId = @UserId, 
                        Description = @Description
                    WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@RiskLevelId", portfolio.RiskLevelId);
                    DbUtils.AddParameter(cmd, "@CashOnHand", portfolio.CashOnHand);
                    DbUtils.AddParameter(cmd, "@UserId", portfolio.UserId);
                    DbUtils.AddParameter(cmd, "@Description", portfolio.Description);
                    DbUtils.AddParameter(cmd, "@Id", portfolio.Id);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void Delete(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM PortfolioPurchase WHERE PortfolioId = @Id; 
                                        DELETE FROM Portfolio WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }

}


    