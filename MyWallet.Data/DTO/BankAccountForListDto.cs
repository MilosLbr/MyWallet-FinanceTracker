using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Data.DTO
{
    public class BankAccountForListDto
    {
        public string AccountName { get; set; }
        
        public decimal Ballance { get; set; }

        public long UserId { get; set; }
    }
}
