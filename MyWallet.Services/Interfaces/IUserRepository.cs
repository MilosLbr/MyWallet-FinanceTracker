using MyWallet.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Interfaces
{
    public interface IUsersRepository : IRepository<User>
    {
        Task<User> GetUserData(long userId);
    }
}
