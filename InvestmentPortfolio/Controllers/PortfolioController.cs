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
    //PortController is created as an API that allows us to CRUD portfolios methods to respond to HTTP requests
    //Web api controller class inherits from the controllerbase class instead of controller
    public class PortfolioController : ControllerBase
    {
        private readonly IUserProfileRepository _profileRepository;
        private readonly IPortfolioRepository _portfolioRepository;
       

        public PortfolioController(IPortfolioRepository portfolioRepository, IUserProfileRepository userProfileRepository)
        {
            _portfolioRepository = portfolioRepository;
            _profileRepository = userProfileRepository;
        }
        // GET: api/<PortfolioController> 
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_portfolioRepository.GetAll());
        }


        //here, user has ability to save a new Portfolio to the db
        //POST api/<PortfolioController>, creates an entity
        //getCurrentId 
        [HttpPost]
        public IActionResult Post(Portfolio portfolio)
        {
            var userProfile = GetCurrentUserProfile();
            portfolio.UserId = userProfile.Id;
            _portfolioRepository.Add(portfolio);
            return NoContent();
        }
      

        // PUT api/<PortfolioController>/5, updates an entity
        //{id} says this method expects the URL to contain a route param with the portfolio's id
        [HttpPut("{id}")]
        public IActionResult Put(int id, Portfolio portfolio)
        {
            if (id != portfolio.Id)
            {
                return BadRequest();
            }
            var userProfile = GetCurrentUserProfile();
            portfolio.UserId = userProfile.Id;
            _portfolioRepository.Update(portfolio);
            return Ok(portfolio);
        }
       
       


        //// DELETE api/<PortfolioController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _portfolioRepository.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _profileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
    
}
