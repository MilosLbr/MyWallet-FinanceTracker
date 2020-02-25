using MyWallet.Data;
using MyWallet.Data.DTO;
using MyWallet.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Implementation
{
    public class UsersRepository : Repository<User>, IUsersRepository
    {
        public UsersRepository(MyWalletContext context) : base(context)
        {
        }

        public MyWalletContext DbContext { get { return _context as MyWalletContext; } }

        public async Task<User> GetUserAndBankAccounts(long userId)
        {
            var user = await DbContext.Users.Include(u => u.BankAccounts).FirstOrDefaultAsync(u => u.Id == userId);

            return user;
        }

        public async Task<User> GetUserData(long userId)
        {
            var user = await DbContext.Users.Include("BankAccounts").Include("Incomes.IncomeCategory").Include("Expenses.ExpenseCategory").FirstOrDefaultAsync(u => u.Id == userId);

            return user;
        }
    }
}
