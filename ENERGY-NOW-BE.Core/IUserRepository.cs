using ENERGY_NOW_BE.Core.auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENERGY_NOW_BE.Core
{
    public interface IUserRepository
    {
        Task<User> GetByUsernameAsync(string username);
        Task AddAsync(User user);
    }

    public interface IRoleRepository
    {
        Task<Role> GetByNameAsync(string roleName);
        Task AddAsync(Role role);
    }

}
