using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace InvestmentPortfolio.Repositories
{
    public abstract class BaseRepository
    {
        private readonly string _connectionString;
        //"protected" to make it available to child classes, but inaccessible to any other code
        //abstraction: base repo can not be directly instantiated but can only be used by inheritance
        public BaseRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        protected SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }
    }
}
