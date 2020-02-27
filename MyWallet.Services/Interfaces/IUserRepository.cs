using MyWallet.Data;
using MyWallet.Data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Interfaces
{
    public interface IUsersRepository : IRepository<User>
    {
        Task<User> GetUserData(long userId);
        Task<User> GetUserAndBankAccounts(long userId);
        Task<IEnumerable<TransactionForListDto>> GetAllUsersTransactions(long userId);
        Task<IEnumerable<TransactionForListDto>> GetTransactionsOnBankAccount(long userId, int bankAccountId);
    }
}
