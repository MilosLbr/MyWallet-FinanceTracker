//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MyWallet.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Income
    {
        public int Id { get; set; }
        public System.DateTime DateAdded { get; set; }
        public int BankAccountId { get; set; }
        public int IncomeCategoryId { get; set; }
        public decimal Ammount { get; set; }
        public string Comment { get; set; }
        public long UserId { get; set; }
    
        public virtual BankAccount BankAccount { get; set; }
        public virtual IncomeCategory IncomeCategory { get; set; }
        public virtual User User { get; set; }
    }
}
