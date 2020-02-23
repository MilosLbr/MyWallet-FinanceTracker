using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using MyWallet.Data.MyIdentitySample;
//using MyWallet.Data.MyIdentityConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet2.Controllers
{
    public interface IAuthRepository
    {
        Task<IdentityResult> Register(MyUser user, string password);
        Task<MyUser> FindUser(string userName, string password);
    }
}
