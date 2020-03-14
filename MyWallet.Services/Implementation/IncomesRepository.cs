using AutoMapper;
using MyWallet.Data;
using MyWallet.Data.DTO;
using MyWallet.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Implementation
{
    public class IncomesRepository : Repository<Income>, IIncomesRepository
    {
        public IncomesRepository(MyWalletContext context) : base(context)
        {
        }
        public MyWalletContext DbContext { get { return _context as MyWalletContext; } }

        public Income AddMoneyToBankAccount(long userId, User userFromDb, IncomeForCreateDto incomeForCreateDto, IMapper mapper)
        {
            var bankAccountId = incomeForCreateDto.BankAccountId;

            var bankAccountToUpdate = userFromDb.BankAccounts.FirstOrDefault(b => b.Id == bankAccountId);
            bankAccountToUpdate.Ballance += incomeForCreateDto.Ammount;

            incomeForCreateDto.UserId = userId;

            var incomeForDb = mapper.Map<Income>(incomeForCreateDto);
            incomeForDb.NewBallance = bankAccountToUpdate.Ballance;

            Add(incomeForDb);

            return incomeForDb;
        }

        public async Task DeleteIncomeRecord(int incomeId)
        {
            var incomeFromDb = await Get(incomeId);
            var bankAccountFromDb = incomeFromDb.BankAccount;

            var ammount = incomeFromDb.Ammount;
            bankAccountFromDb.Ballance -= ammount;

            Remove(incomeFromDb);
        }

        public async Task UpdateIncomeRecord(IncomeForUpdateDto incomeForUpdateDto, IMapper mapper)
        {
            var incomeFromDb = await Get(incomeForUpdateDto.Id);

            var bankAccountFromDb = incomeFromDb.BankAccount;

            bankAccountFromDb.Ballance = bankAccountFromDb.Ballance - incomeFromDb.Ammount + incomeForUpdateDto.Ammount;

            incomeFromDb.NewBallance = incomeFromDb.NewBallance - incomeFromDb.Ammount + incomeForUpdateDto.Ammount;

            mapper.Map(incomeForUpdateDto, incomeFromDb);
        }
    }
}
