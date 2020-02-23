using MyWallet.Data;
using MyWallet.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Implementation
{
    public class BankAccountsRepository : Repository<BankAccount>, IBankAccountsRepository
    {
        public BankAccountsRepository(MyWalletContext context) : base(context)
        {
        }
    }
}
