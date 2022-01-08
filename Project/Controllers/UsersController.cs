using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ProjectBL;
using ProjectDEC.Users;

namespace Project.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUsersBL _UsersBL;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IConfiguration configuration, IUsersBL UsersBL, ILogger<UsersController> logger)
        {
            _configuration = configuration;
            _UsersBL = UsersBL;
            _logger = logger;
        }

        [HttpPost]
        public IActionResult UpsertUser([FromBody] User user)
        {
            _logger.LogInformation("entered Users.UpsertUser");

            try
            {
                if (UserExists(user))
                {
                    return StatusCode(400, "user Exists");
                }
                return Ok(_UsersBL.UPSERT_USER(_configuration["ConnectionStrings:connStr"], user));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to execute Users.UpsertUser: ");
                return StatusCode(500, "אירעה שגיאה בעידכון משתמש");
            }
        }

        [HttpPost]
        public IActionResult Login([FromBody] User login)
        {
            _logger.LogInformation("entered Users.Login");

            try
            {
                var res = _UsersBL.LOGIN(_configuration["ConnectionStrings:connStr"], login);
                if (res != null && res.Any())
                {
                    return Ok(res);
                }
                return StatusCode(400, "No user found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to execute Users.Login: ");
                return StatusCode(500, "אירעה שגיאה בנסיון כניסה");
            }
        }

        public bool UserExists([FromBody] User login)
        {
            _logger.LogInformation("entered Users.UserExists");

            try
            {
                var res = _UsersBL.LOGIN(_configuration["ConnectionStrings:connStr"], login);

                return res != null && res.Any() ? true : false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to execute Users.UserExists: ");
                return false;
            }
        }
    }
}
