using MyWallet.Data;
using MyWallet.Data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Interfaces
{
    public interface IBankAccountsRepository : IRepository<BankAccount>
    {
        Task<BankAccountsAndCategories> getBankAccountsAndTransactionCategories(long userId);
    }
}
