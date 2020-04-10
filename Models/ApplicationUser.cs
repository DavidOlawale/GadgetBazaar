using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MobileStoreApp.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string MiddleName { get; set; }
        public string LastName { get; set; }

        [EmailAddress]
        public override string UserName { get; set; }
    }
}