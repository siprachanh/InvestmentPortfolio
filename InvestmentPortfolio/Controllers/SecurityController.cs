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
    public class SecurityController : ControllerBase
    {
        private readonly ISecurityRepository _securityRepository;
        private readonly IUserProfileRepository _profileRepository;
        //constructor: special method or fn; named the same as the class
        //create an instance of a class with a constructor; store that instance with a variable
        //controller handles the Http requests
        public SecurityController(ISecurityRepository securityRepository, IUserProfileRepository userProfileRepository)
        {
            _securityRepository = securityRepository;
            _profileRepository = userProfileRepository;
        }
            // GET: api/<SecurityController>
        [HttpGet]
        public IActionResult GetAllSecurity()
        {
            return Ok(_securityRepository.GetAll());
        }

        // GET api/<SecurityController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SecurityController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SecurityController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SecurityController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _profileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
