using AutoMapper;
using MyWallet.Data;
using MyWallet.Data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWallet.Services.Interfaces
{
    public interface IIncomesRepository : IRepository<Income>
    {
        Income AddMoneyToBankAccount(long userId, User user, IncomeForCreateDto incomeForCreateDto, IMapper mapper);

        Task DeleteIncomeRecord(int incomeId);
    }
}
