using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileStoreApp.Models.Dtos
{
    public class SignUpDto
    {
        public Customer Customer { get; set; }
        public string Password { get; set; }
    }
}
