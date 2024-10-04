using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENERGY_NOW_BE.Core.auth
{

    public class UserRole
    {
        public int UserId { get; set; } // Assuming User has an Id of type int
        public int RoleId { get; set; } // Assuming Role has an Id of type int

        public User User { get; set; }
        public Role Role { get; set; }
    }


}
