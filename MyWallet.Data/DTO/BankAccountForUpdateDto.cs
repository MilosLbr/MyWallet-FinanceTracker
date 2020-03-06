using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Data.DTO
{
    public class BankAccountForUpdateDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string AccountName { get; set; }
    }
}
