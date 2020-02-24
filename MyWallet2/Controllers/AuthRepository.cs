using AutoMapper;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using MyWallet.Data;
using MyWallet.Data.MyIdentitySample;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace MyWallet2.Controllers
{
    public class AuthRepository : IAuthRepository, IDisposable
    {
        private MyUserManager _userManager;

        public AuthRepository()
        {
            _userManager = HttpContext.Current.GetOwinContext().GetUserManager<MyUserManager>();
        }

        public async Task<IdentityResult> Register(MyUser user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);

            return result;
        }

        public async Task<MyUser> FindUser(string userName, string password)
        {
            var user = await _userManager.FindAsync(userName, password);

            return user;
        }
        

        public void Dispose()
        {
            _userManager.Dispose();
        }
    }
}