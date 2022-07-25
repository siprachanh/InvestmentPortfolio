using InvestmentPortfolio.Models;
using System.Collections.Generic;

namespace InvestmentPortfolio.Repositories
{
    public interface IPortfolioRepository
    {
        List<Portfolio> GetAll();
        public void Add(Portfolio portfolio);
        public void Update(Portfolio portfolio);
        public void Delete(int id);
    }
}