using AutoMapper;
using MyWallet.Data;
using MyWallet.Data.DTO;
using MyWallet.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Implementation
{
    public class ExpensesRepository : Repository<Expense>, IExpensesRepository
    {
        public ExpensesRepository(MyWalletContext context) : base(context)
        {
        }

        public MyWalletContext DbContext { get { return _context as MyWalletContext; } }


        public Expense SubtractMoneyFromBankAccount(long userId, User userFromDb, ExpenseForCreateDto expenseForCreateDto, IMapper mapper)
        {
            
            var bankAccountId = expenseForCreateDto.BankAccountId;
            var bankAccountToUpdate = userFromDb.BankAccounts.FirstOrDefault(b => b.Id == bankAccountId);

            bankAccountToUpdate.Ballance -= expenseForCreateDto.Ammount;

            expenseForCreateDto.UserId = userId;

            var expenseForDb = mapper.Map<Expense>(expenseForCreateDto);            

            Add(expenseForDb);

            return expenseForDb;
        }
    }
}
