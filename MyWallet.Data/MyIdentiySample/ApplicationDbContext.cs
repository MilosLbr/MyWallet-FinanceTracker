﻿namespace MyWallet.Data.MyIdentitySample
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;

    using Microsoft.AspNet.Identity.EntityFramework;

    
    public class ApplicationDbContext : IdentityDbContext<MyUser, MyRole, long, MyLogin, MyUserRole, MyClaim>
    {

        #region constructors and destructors

        public ApplicationDbContext()
            : base("DefaultConnection")
        {
        }

        #endregion

        #region methods

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Map Entities to their tables.
            modelBuilder.Entity<MyUser>().ToTable("User");
            modelBuilder.Entity<MyRole>().ToTable("Role");
            modelBuilder.Entity<MyClaim>().ToTable("UserClaim");
            modelBuilder.Entity<MyLogin>().ToTable("UserLogin");
            modelBuilder.Entity<MyUserRole>().ToTable("UserRole");

            // Set AutoIncrement-Properties
            modelBuilder.Entity<MyUser>().Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<MyClaim>().Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<MyRole>().Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }

        #endregion
    }
}