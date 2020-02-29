using MyWallet.Data;
using MyWallet.Data.DTO;
using MyWallet.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyWallet.Data.DTO;
using System.Data.Entity;

namespace MyWallet.Services.Implementation
{
    public class BankAccountsRepository : Repository<BankAccount>, IBankAccountsRepository
    {
        public BankAccountsRepository(MyWalletContext context) : base(context)
        {
        }
        public MyWalletContext DbContext { get { return _context as MyWalletContext; } }
                      

        public async Task<BankAccountsAndCategories> getBankAccountsAndTransactionCategories(long userId)
        {
            var IncomeCategories = await DbContext.IncomeCategories.Select(i => new IncomeCategoryDto
            {
                Id = i.Id,
                IncomeCategoryName = i .IncomeCategoryName
            })
                .ToListAsync();

            var ExpenseCategories = await DbContext.ExpenseCategories.Select(e => new ExpenseCategoryDto 
            {
                Id = e.Id,
                ExpenseCategoryName = e.ExpenseCategoryName
            })
                .ToListAsync();

            var bankAccounts = await DbContext.BankAccounts.Where(b => b.UserId == userId)
                .Select(b => new BankAccountForListDto { 
                    Id = b.Id,
                    AccountName =b.AccountName,
                    Ballance = b.Ballance,
                    UserId = b.UserId
                })
                .ToListAsync();

            var result = new BankAccountsAndCategories()
            {
                BankAccounts = bankAccounts,
                IncomeCategories = IncomeCategories,
                ExpenseCategories = ExpenseCategories
            };

            return result;
        }
    }
}
