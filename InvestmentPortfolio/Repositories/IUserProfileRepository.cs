using InvestmentPortfolio.Models;
using System.Collections.Generic;

namespace InvestmentPortfolio.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}