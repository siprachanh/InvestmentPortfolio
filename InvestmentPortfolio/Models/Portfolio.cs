using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace InvestmentPortfolio.Models
{
    public class Portfolio
    {
        public int Id { get; set; }
        public int RiskLevelId { get; set; }
        public decimal CashOnHand { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }

        public RiskLevel RiskLevel { get; internal set; }
        public UserProfile UserProfile { get; internal set; }
       
    }
}
