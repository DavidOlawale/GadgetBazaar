﻿using Microsoft.AspNetCore.Identity;
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
            if (!dbContext.Users.Any())
            {
                _ = await roleManager.CreateAsync(new IdentityRole(RoleNames.Admin));
                _ = await roleManager.CreateAsync(new IdentityRole(RoleNames.Customer));
                var admin = new Admin
                {
                    FirstName = "Olawale",
                    LastName = "David",
                    Email = "olawaledavid11@gmail.com",
                    PhoneNumber = "+2349016838771",
                    UserName = "olawaledavid11@gmail.com"
                };
                var customer = new Customer
                {
                    FirstName = "Jahswill",
                    LastName = "Achoja",
                    Email = "efe@gmail.com",
                    PhoneNumber = "+2349012345678",
                    UserName = "efe@gmail.com"
                };
                _ = await authService.SignUp(admin, "123abc", RoleNames.Admin);
                _ = await authService.SignUp(customer, "123abc", RoleNames.Customer);
            }

            if (!dbContext.Brands.Any())
            {
                await dbContext.Brands.AddRangeAsync(
                        new Brand("Samsung"),
                        new Brand("Apple"),
                        new Brand("Tecno"),
                        new Brand("Huawei"),
                        new Brand("Infinix"),
                        new Brand("Samsung")
                    );
                await dbContext.SaveChangesAsync();
            }
            

        }
    }
}
