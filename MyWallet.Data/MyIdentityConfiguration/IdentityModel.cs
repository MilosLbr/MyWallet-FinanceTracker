//using Microsoft.AspNet.Identity;
//using Microsoft.AspNet.Identity.EntityFramework;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity;
//using System.Linq;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;

//namespace MyWallet.Data.MyIdentityConfiguration
//{
//    //public class ApplicationUser : IdentityUser
//    //{
//    //    public string Hometown { get; set; }

//    //    public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
//    //    {
//    //        // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
//    //        var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
//    //        // Add custom user claims here
//    //        return userIdentity;
//    //    }
//    //}

//    public class ApplicationDbContext : IdentityDbContext<MyAspNetUser, MyAspNetRole, string, MyAspNetUserLogin, MyAspNetUserRole, MyAspNetUserClaim>
//    {
//        public ApplicationDbContext()
//            : base("DefaultConnection")
//        {
//        }

//        public static ApplicationDbContext Create()
//        {
//            return new ApplicationDbContext();
//        }

//        protected override void OnModelCreating(DbModelBuilder modelBuilder)
//        {
//            base.OnModelCreating(modelBuilder);

//            // Map Entities to their tables.
//            modelBuilder.Entity<MyAspNetUser>().ToTable("AspNetUsers");
//            modelBuilder.Entity<MyAspNetRole>().ToTable("AspNetRoles");
//            modelBuilder.Entity<MyAspNetUserClaim>().ToTable("AspNetUserClaims");
//            modelBuilder.Entity<MyAspNetUserLogin>().ToTable("AspNetUserLogins");
//            modelBuilder.Entity<MyAspNetUserRole>().ToTable("AspNetUserRoles");
//        }
//    }
//}
