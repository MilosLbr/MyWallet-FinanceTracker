using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Data.DTO
{
    public class BankAccountCreateDto
    {
        [Required]
        public string AccountName { get; set; }
        [Required]
        public decimal Ballance { get; set; }

        public long UserId { get; set; }
    }
}
