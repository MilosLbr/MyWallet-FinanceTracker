﻿using MyWallet.Data;
using MyWallet.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Implementation
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MyWalletContext _context;
        public IValuesRepository Values { get; set; }
        public IBankAccountsRepository BankAccounts { get; set; }

        public UnitOfWork(MyWalletContext context)
        {
            _context = context;
            Values = new ValuesRepository(_context);
            BankAccounts = new BankAccountsRepository(_context);
        }

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}