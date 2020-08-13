using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MobileStoreApp.Data;
using MobileStoreApp.Models;
using MobileStoreApp.Models.Dtos;
using MobileStoreApp.Services;

namespace MobileStoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AuthService authService;
        private readonly UserManager<ApplicationUser> userManager;

        public class LoginData
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }
        public IdentityController(ApplicationDbContext context, AuthService authService, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            this.authService = authService;
            this.userManager = userManager;
        }

        [HttpPost("signup")]
        public async Task<ActionResult<string>> SignUpAsync(SignUpDto signUpData)
        {
            signUpData.Customer.UserName = signUpData.Customer.Email;
            var result = await userManager.CreateAsync(signUpData.Customer, signUpData.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors.First());

            var roleResult = await userManager.AddToRoleAsync(signUpData.Customer, RoleNames.Customer);

            var loginResult = await authService.Login(signUpData.Customer.Email, signUpData.Password);
            return new CreatedResult("", loginResult);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginData loginData)
        {
            var loginResult = await authService.Login(loginData.UserName, loginData.Password);
            if (!loginResult.UserExists || !loginResult.LoginSuccessfull)
                return BadRequest(new { success = false });

            return Ok(new { success = true, Token = loginResult.Token });

        }

    }
}
