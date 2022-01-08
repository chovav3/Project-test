using Dapper;
using System.Data;

namespace ProjectDL
{
   public interface IGeneralDL
    {
        object Execute<T>(string connectionString, string sprocedureName, DynamicParameters parameters, CommandType commType = CommandType.StoredProcedure);
    }
}