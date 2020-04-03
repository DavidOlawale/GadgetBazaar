using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileStoreApp.Services
{
    public class LoginResult
    {
        public bool UserExists = true;
        public bool LoginSuccessfull = false;
        public string Token;
    }
}
