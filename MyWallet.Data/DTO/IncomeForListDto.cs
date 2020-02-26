using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Data.DTO
{
    public class IncomeForListDto
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        public decimal Ammount { get; set; }
        public string Comment { get; set; }
        public long UserId { get; set; }
        public decimal NewBallance { get; set; }

        public virtual BankAccountForListDto BankAccount { get; set; }
        public virtual IncomeCategoryDto IncomeCategory { get; set; }
    }
}
