﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Data.DTO
{
    public class IncomeForUpdateDto
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        public int IncomeCategoryId { get; set; }
        public decimal Ammount { get; set; }
        public string Comment { get; set; }

    }
}
