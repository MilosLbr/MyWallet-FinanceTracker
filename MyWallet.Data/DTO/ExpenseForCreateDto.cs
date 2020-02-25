using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Data.DTO
{
    public class ExpenseForCreateDto
    {
        public DateTime DateAdded { get; set; }
        public int BankAccountId { get; set; }
        public int ExpenseCategoryId { get; set; }
        public decimal Ammount { get; set; }
        public string Comment { get; set; }
        public long UserId { get; set; }

        public ExpenseForCreateDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}
