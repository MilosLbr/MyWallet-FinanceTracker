using AutoMapper;
using MyWallet.Data;
using MyWallet.Data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Interfaces
{
    public interface IExpensesRepository : IRepository<Expense>
    {
        Expense SubtractMoneyFromBankAccount(long userId, User user, ExpenseForCreateDto expenseForCreateDto, IMapper mapper);
    }
}
