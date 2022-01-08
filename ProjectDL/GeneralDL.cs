using Dapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace ProjectDL
{
   public class GeneralDL : IGeneralDL
    {
        private readonly ILogger<GeneralDL> _logger;


        public GeneralDL(ILogger<GeneralDL> logger)
        {
            _logger = logger;
        }
        public object Execute<T>(string connectionString, string procedureName, DynamicParameters parameters, CommandType commType = CommandType.StoredProcedure)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    return conn.Query<T>(procedureName, param: parameters, commandType: commType);
                }
            }
            catch (Exception ex)
            {
                 _logger.LogError(ex, "Failed to Execute for {0} {1}", procedureName, parameters);
                throw;
            }
        }
    }
}
