using ENERGY_NOW_BE.Core;
using ENERGY_NOW_BE.Core.auth;

namespace ENERGY_NOW_BE.Application.Auth
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
            /*_roleRepository = roleRepository;*/
        }

        public async Task<bool> RegisterAsync(string username, string password, string role)
        {
            // Check if user exists
            if (await _userRepository.GetByUsernameAsync(username) != null)
            {
                return false; // User already exists
            }

            // Hash the password
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);


            // Create new user
            var user = new User
            {
                Username = username,
                PasswordHash = passwordHash
            };

            // Assign roles
            var userRole = await _roleRepository.GetByNameAsync(role);
            if (userRole == null)
            {
                return false; // Role doesn't exist
            }

            user.UserRoles.Add(new UserRole { User = user, Role = userRole });

            // If the role is "CLIENT", also assign the "USER" role
            if (role == "CLIENT")
            {
                var userClientRole = await _roleRepository.GetByNameAsync("USER");
                user.UserRoles.Add(new UserRole { User = user, Role = userClientRole });
            }

            // Save the user
            await _userRepository.AddAsync(user);
            return true;
        }

    }

}
