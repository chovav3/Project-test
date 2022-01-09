using Dapper;
using ProjectDEC.Users;
//using ProjectDEC.Users;
using ProjectDL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace ProjectBL
{
    public class UsersBL : IUsersBL
    {
        private readonly IGeneralDL _GeneralDL;
        public UsersBL(IGeneralDL GeneralDL)
        {
            _GeneralDL = GeneralDL;
        }
        public IEnumerable<User> UPSERT_USER(string conn, User user)
        {
            var spName = UserOperation.UPDATE_USER;
            var parameters = new DynamicParameters();

            if (user.id == 0)
            {
                spName = UserOperation.INSERT_USER;
            }
            else
            {
                parameters.Add("id", user.id);
            }
            parameters.Add("name", user.name);
            parameters.Add("email", user.email);
            parameters.Add("password", user.password);
            return (IEnumerable<User>)_GeneralDL.Execute<User>(conn, spName, parameters, CommandType.StoredProcedure);
        }

        public IEnumerable<User> LOGIN(string conn, User login)
        {
            var spName = UserOperation.LOGIN_USER;
            var parameters = new DynamicParameters();
            parameters.Add("name", login.name);
            parameters.Add("password", login.password);
            return (IEnumerable<User>)_GeneralDL.Execute<User>(conn, spName, parameters, CommandType.StoredProcedure);
        }
    }
}
