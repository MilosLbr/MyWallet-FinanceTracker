using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using MyWallet.Data.MyIdentitySample;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

//namespace MyWallet.Data.MyIdentityConfiguration
//{
//    public class MyAspNetUser : IdentityUser<string, MyAspNetUserLogin, MyAspNetUserRole, MyAspNetUserClaim>
//    {
//        public ICollection<BankAccount> BankAccounts { get; set; }
//        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(MyUserManager userManager)
//        {
//            var userIdentity = await userManager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);

//            return userIdentity;
//        }
//    }
//}
