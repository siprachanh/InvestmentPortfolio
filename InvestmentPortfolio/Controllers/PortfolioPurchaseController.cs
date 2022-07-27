using Microsoft.AspNetCore.Mvc;
using System;
using InvestmentPortfolio.Repositories;
using InvestmentPortfolio.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace InvestmentPortfolio.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioPurchaseController : ControllerBase
    {
        //PP controller is created as an API; allows CRUD methods to respond to HTTP requests
        //Controller class inherits from the base class
        private readonly IUserProfileRepository _profileRepository;
        private readonly IPortfolioRepository _portfolioRepository;
        private readonly IPortfolioPurchaseRepository _portfolioPurchaseRepository;


        public PortfolioPurchaseController(IPortfolioPurchaseRepository portfolioPurchaseRepository, IPortfolioRepository portfolioRepository, IUserProfileRepository userProfileRepository)
        {
            _portfolioRepository = portfolioRepository;
            _profileRepository = userProfileRepository;
            _portfolioPurchaseRepository = portfolioPurchaseRepository;
        }
        // GET: api/<PortfolioPurchaseController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_portfolioPurchaseRepository.GetAll());
        }

        // GET api/<PortfolioPurchaseController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PortfolioPurchaseController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PortfolioPurchaseController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PortfolioPurchaseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
