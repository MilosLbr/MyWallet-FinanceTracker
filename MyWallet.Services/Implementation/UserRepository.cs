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

        public async Task<IEnumerable<TransactionForListDto>> GetAllUsersTransactions(long userId)
        {
            var usersIncomes = await DbContext.Incomes.Include("IncomeCategory").Where(i => i.UserId == userId).Select(i => new TransactionForListDto()
            {
                Id = i.Id,
                Ammount = i.Ammount,
                DateAdded = i.DateAdded,
                Comment = i.Comment,
                NewBallance = i.NewBallance,
                TransactionType = "Income",
                CategoryName = i.IncomeCategory.IncomeCategoryName

            }).ToListAsync();

            var usersExpenses = await DbContext.Expenses.Include("ExpenseCategory").Where(e => e.UserId == userId).Select(e => new TransactionForListDto()
            {
                Id = e.Id,
                Ammount = e.Ammount,
                DateAdded = e.DateAdded,
                Comment = e.Comment,
                NewBallance = e.NewBallance,
                TransactionType = "Expense",
                CategoryName = e.ExpenseCategory.ExpenseCategoryName
            }).ToListAsync();

            var allTransactions = usersIncomes.Concat(usersExpenses).OrderByDescending(t => t.DateAdded).ToList();

            return allTransactions;
        }

        public async Task<IEnumerable<TransactionsGroupedByDate>> GetTransactionsOnBankAccount(long userId, int bankAccountId)
        {
            var usersIncomes = await DbContext.Incomes.Include("IncomeCategory").Where(i => i.UserId == userId && i.BankAccountId == bankAccountId).Select(i => new TransactionForListDto()
            {
                Id = i.Id,
                Ammount = i.Ammount,
                DateAdded = i.DateAdded,
                Comment = i.Comment,
                NewBallance = i.NewBallance,
                TransactionType = "Income",
                CategoryName = i.IncomeCategory.IncomeCategoryName,
                BankAccountId = bankAccountId

            }).ToListAsync();

            var usersExpenses = await DbContext.Expenses.Include("ExpenseCategory").Where(e => e.UserId == userId && e.BankAccountId == bankAccountId).Select(e => new TransactionForListDto()
            {
                Id = e.Id,
                Ammount = e.Ammount,
                DateAdded = e.DateAdded,
                Comment = e.Comment,
                NewBallance = e.NewBallance,
                TransactionType = "Expense",
                CategoryName = e.ExpenseCategory.ExpenseCategoryName,
                BankAccountId = bankAccountId
            }).ToListAsync();

            var allTransactions = usersIncomes.Concat(usersExpenses).GroupBy(t => t.DateAdded.Date).Select(t => new TransactionsGroupedByDate
            { 
                Date = t.Key,
                Transactions = t.OrderByDescending(g => g.DateAdded)
            }).OrderByDescending(t => t.Date).ToList();

            return allTransactions;
        }
    }
}
