using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Data.DTO
{
    public class TransactionsGroupedByDate
    {
        public DateTime Date { get; set; }
        public IOrderedEnumerable<TransactionForListDto> Transactions { get; set; }
    }
}
