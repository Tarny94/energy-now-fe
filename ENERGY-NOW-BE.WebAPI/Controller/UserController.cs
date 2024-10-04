using ENERGY_NOW_BE.Application.Auth;
using Microsoft.AspNetCore.Mvc;

namespace ENERGY_NOW_BE.WebAPI.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("The API is working.");
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _userService.RegisterAsync(request.Username, request.Password, request.Role);
            if (!result)
            {
                return BadRequest("Registration failed. User may already exist or role is invalid.");
            }

            return Ok("Registration successful.");
        }
    }

    public class RegisterRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
