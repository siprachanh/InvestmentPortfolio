using System.Collections.Generic;
using InvestmentPortfolio.Models;

namespace InvestmentPortfolio.Repositories
{
   public interface IRiskLevelRepository
    {
        public List<RiskLevel> GetAll();
        public RiskLevel GetById(int id);
    }
}