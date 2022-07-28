using InvestmentPortfolio.Models;
using System.Collections.Generic;

namespace InvestmentPortfolio.Repositories
{
    public interface ISecurityRepository
    {
        List<Security> GetAll();
    }
}