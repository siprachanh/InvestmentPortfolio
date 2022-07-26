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
    public class RiskLevelController : ControllerBase
    {
        private readonly IRiskLevelRepository _riskLevelRepository;
        private readonly IUserProfileRepository _profileRepository;

        //constructor: special method or fn; named the same as the class
        //create an instance of a class with a constructor; store that instance with a variable
        public RiskLevelController(IRiskLevelRepository riskLevelRepository, IUserProfileRepository userProfileRepository)
        {
            _riskLevelRepository = riskLevelRepository;
            _profileRepository = userProfileRepository;
        }

        // GET: api/<RiskLevelController>
        [HttpGet]
        public IActionResult GetAllRiskLevels()
        {
            return Ok(_riskLevelRepository.GetAll());
        }

        //[HttpGet]
        //public List<RiskLevel> Get()
        //{
        //    return _riskLevelRepository.GetAllRiskLevels();
        //}
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _profileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
