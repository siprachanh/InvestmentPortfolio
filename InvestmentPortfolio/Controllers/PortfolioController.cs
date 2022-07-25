﻿using Microsoft.AspNetCore.Mvc;
using System;
using InvestmentPortfolio.Repositories;
using InvestmentPortfolio.Models;
using Microsoft.AspNetCore.Authorization;

namespace InvestmentPortfolio.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    //PortController is created as an API that allows us to CRUD portfolios methods to respond to HTTP requests
    //Web api controller class inherits from the controllerbase class instead of controller
    public class PortfolioController : ControllerBase
    {
        private readonly IPortfolioRepository _portfolioRepository;
        public PortfolioController(IPortfolioRepository portfolioRepository)
        {
            _portfolioRepository = portfolioRepository;
        }
        // GET: api/<PortfolioController> 
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_portfolioRepository.GetAll());
        }

        // GET api/<PortfolioController>/5
        //[HttpGet("{id}")]
        //public IActionResult Get(int id)
        //{
        //    var portfolio = _portfolioRepository.GetById(id);
        //    if (portfolio == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(portfolio);
        //}

        //here, user has ability to save a new Portfolio to the db
        //POST api/<PortfolioController>, creates an entity
        [HttpPost]
        public IActionResult Post(Portfolio portfolio)
        {
            _portfolioRepository.Add(portfolio);
            return CreatedAtAction("Get", new { id = portfolio.Id }, portfolio);
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

            _portfolioRepository.Update(portfolio);
            return Ok(portfolio);
        }
        //try also for ln 59: return NoContent();


        //// DELETE api/<PortfolioController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _portfolioRepository.Delete(id);
            return NoContent();
        }
    }
}