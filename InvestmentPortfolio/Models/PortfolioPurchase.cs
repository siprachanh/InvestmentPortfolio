using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace InvestmentPortfolio.Models
{
    public class PortfolioPurchase
    {
        public int Id { get; set; }
        public int SecurityId { get; set; }
        public int PortfolioId { get; set; }
        public int AmountPurchase { get; set; }
        public DateTime PurchaseDate { get; set; }

        public Security Security { get; set; }

        public Portfolio Portfolio { get; set; }
    }
}
