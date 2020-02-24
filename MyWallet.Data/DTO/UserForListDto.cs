using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Data.DTO
{
    public class UserForListDto
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public  ICollection<BankAccountForListDto> BankAccounts { get; set; }
        public  ICollection<UserClaim> UserClaims { get; set; }
        public  ICollection<UserLogin> UserLogins { get; set; }
        public  ICollection<Role> Roles { get; set; }
        public  ICollection<Income> Incomes { get; set; }
    }
}
