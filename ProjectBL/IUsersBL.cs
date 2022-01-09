//using ProjectDEC.Users;
using ProjectDEC.Users;
using System.Collections.Generic;

namespace ProjectBL
{
    public interface IUsersBL
    {
        IEnumerable<User> LOGIN(string conn, User login);
        IEnumerable<User> UPSERT_USER(string conn, User user);
    }
}