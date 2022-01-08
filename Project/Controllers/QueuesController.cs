using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ProjectBL;
using ProjectDEC.Queues;

namespace Project.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class QueuesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<QueuesController> _logger;
        private readonly IQueuesBL _queuesBL;
        public QueuesController(IConfiguration configuration, ILogger<QueuesController> logger, IQueuesBL queuesBL) {
            _logger = logger;
            _configuration = configuration;
            _queuesBL = queuesBL;
        }

        [HttpGet]
        public IActionResult GetQueues()
        {
            _logger.LogInformation("entered QueueS.GetQueues");

            try
            {
                return Ok(_queuesBL.GETQUEUES(_configuration["ConnectionStrings:connStr"]));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex + "Failed to execute Queues.GetQueues ");
                return StatusCode(500, "אירעה שגיאה בנסיון להביא את התורות");
            }
        }

        [HttpPost]
        public IActionResult InsertQueues([FromBody] Queue queue)
        {
            _logger.LogInformation("entered Queues.InsertQueues");

            try
            {
                return Ok(_queuesBL.INSERTQUEUES(_configuration["ConnectionStrings:connStr"], queue));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex + "Failed to execute Queues.InsertQueues ");
                return StatusCode(500, "אירעה שגיאה בנסיון להוסיף רשומה");
            }
        }
    }
}
