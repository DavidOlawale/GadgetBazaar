using Microsoft.AspNetCore.Identity;
using MobileStoreApp.Models;
using MobileStoreApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileStoreApp.Data
{
    public static class DbInitializer
    {
        public static async Task SeedDatabaseAsync(
            ApplicationDbContext dbContext,
            RoleManager<IdentityRole> roleManager,
            AuthService authService)
        {
            if (dbContext.Users.Any())
                return;
            _ = await roleManager.CreateAsync(new IdentityRole(RoleNames.Admin));
            _ = await roleManager.CreateAsync(new IdentityRole(RoleNames.Customer));
            var admin = new Admin
            {
                FirstName = "Olawale",
                LastName = "David",
                Email = "olawaledavid11@gmail.com",
                PhoneNumber = "+2349016838771",
                UserName = "olawaledavid"
            };
            var customer = new Customer
            {
                FirstName = "Jahswill",
                LastName = "Achoja",
                Email = "efe@gmail.com",
                PhoneNumber = "+2349012345678",
                UserName = "jahswill"
            };
            _ = await authService.SignUp(admin, "123abc", RoleNames.Admin);
            _ = await authService.SignUp(customer, "123abc", RoleNames.Customer);

        }
    }
}
