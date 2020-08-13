using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MobileStoreApp.Data;
using MobileStoreApp.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MobileStoreApp.Services
{
    public class AuthService
    {
        private readonly IConfiguration configuration;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly ApplicationDbContext dbContext;

        public AuthService(IConfiguration config,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ApplicationDbContext dbContext)
        {
            configuration = config;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.dbContext = dbContext;
        }

        public async Task<IdentityResult> SignUp(ApplicationUser user, string password, string role)
        {
            var result = await userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, role);
            }
            return result;
        }
        public async Task<LoginResult> Login(string email, string password)
        {
            var result = new LoginResult();
            var user = dbContext.Users.SingleOrDefault(user => user.Email == email);
            if (user == null)
            {
                result.UserExists = false;
                return result;
            }

            var signInResult = await signInManager.PasswordSignInAsync(email, password, false, false);
            if (signInResult.Succeeded)
                result.LoginSuccessfull = true;
            
            var role = (await userManager.GetRolesAsync(user))[0];
            var key = Encoding.UTF8.GetBytes(configuration["jwt:key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Role, role),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim("AspNet.Identity.SecurityStamp", user.SecurityStamp),
                    new Claim(ClaimTypes.Expiration, DateTime.Now.AddDays(2).ToString())
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            result.Token = tokenHandler.WriteToken(token);
            return result;
        }
    }
}
