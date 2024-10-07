using ENERGY_NOW_BE.Core;
using ENERGY_NOW_BE.Core.Entity;
using Microsoft.EntityFrameworkCore;




namespace ENERGY_NOW_BE.Infrastructure
{
    public class UserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        //public async Task<User?> GetByUsernameAsync(string username)
        //{
        //    return await _context.Users
        //        .FirstOrDefaultAsync(u => u.Username == username);
        //}

        //public async Task AddAsync(User user)
        //{
        //    await _context.Users.AddAsync(user);
        //    await _context.SaveChangesAsync();
        //}
    }

}
