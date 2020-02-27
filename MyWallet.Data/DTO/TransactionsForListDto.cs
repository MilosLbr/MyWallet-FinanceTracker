using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Data.DTO
{
    public class TransactionForListDto
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        public decimal Ammount { get; set; }
        public string Comment { get; set; }
        public decimal NewBallance { get; set; }
        public string TransactionType { get; set; }
        public string CategoryName { get; set; }
        public int BankAccountId { get; set; }
    }
}
