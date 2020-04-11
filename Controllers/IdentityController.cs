using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MobileStoreApp.Data;
using MobileStoreApp.Models;
using MobileStoreApp.Services;

namespace MobileStoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AuthService authService;

        public class LoginData
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }
        public IdentityController(ApplicationDbContext context, AuthService authService)
        {
            _context = context;
            this.authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginData loginData)
        {
            var loginResult = await authService.Login(loginData.UserName, loginData.Password);
            if (!loginResult.UserExists || !loginResult.LoginSuccessfull)
                return BadRequest("Incorrect User name or password");

            return Ok(new { message = "Login Succesfull", Token = loginResult.Token });

        }

    }
}
