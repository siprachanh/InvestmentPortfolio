using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;



namespace InvestmentPortfolio.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string FirebaseUserId { get; set; }
        public string Email { get; set; }
    }
}
