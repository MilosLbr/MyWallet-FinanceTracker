using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyWallet.Data;
using MyWallet.Services;
using MyWallet.Services.Interfaces;

namespace MyWallet.Services.Implementation
{
    class ExpenseCategoriesRepository : Repository<ExpenseCategory>, IExpenseCategoriesRepository
    {
        public ExpenseCategoriesRepository(MyWalletContext context) : base(context)
        {
        }
    }
}
