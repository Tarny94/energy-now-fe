using ENERGY_NOW_BE.Core.Entity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENERGY_NOW_BE.Core.Interface
{
    public interface IAuthenticationService
    {
        Task<IdentityResult> RegisterUser(UserRegister userRegister);
        //Task<string> LoginUser(UserLogin userLogin);
    }
}
