using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IValuesRepository Values { get; }
        IBankAccountsRepository BankAccounts { get; }
        IIncomesRepository Incomes { get; }
        IUsersRepository Users { get; }
        Task<int> Complete();

    }
}
