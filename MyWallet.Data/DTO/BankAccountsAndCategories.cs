using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Data.DTO
{
    public class BankAccountsAndCategories
    {
        public List<BankAccountForListDto> BankAccounts { get; set; }
        public List<IncomeCategoryDto> IncomeCategories { get; set; }
        public List<ExpenseCategoryDto> ExpenseCategories { get; set; }
    }
}
