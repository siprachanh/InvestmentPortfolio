using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace InvestmentPortfolio.Models
{
    public class Security
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TypeId { get; set; }

        public decimal Price { get; set; }
    }
}
