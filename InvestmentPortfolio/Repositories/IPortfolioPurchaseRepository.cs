using InvestmentPortfolio.Models;
using System.Collections.Generic;

namespace InvestmentPortfolio.Repositories
{
    public interface IPortfolioPurchaseRepository
    {
        List<PortfolioPurchase> GetAll();
        public void Add(PortfolioPurchase portfoliopurchase);
        public void Update(PortfolioPurchase portfoliopurchase);
        public void Delete(int id);
    }
}