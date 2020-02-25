using AutoMapper;
using Microsoft.AspNet.Identity;
using MyWallet.Data;
using MyWallet.Data.DTO;
using MyWallet.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MyWallet2.ControlersApi
{
    [RoutePrefix("api/users/{userId}/incomes")]
    public class IncomesController : ApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public IncomesController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetIncomeRecordsForUser(long userId)
        {
            if (!IsUserAuthorized(userId))
                return Unauthorized();

            var incomeRecordsFromDb = await _unitOfWork.Incomes.Find(i => i.UserId == userId).ToListAsync();

            var incomesList = _mapper.Map<List<IncomeForListDto>>(incomeRecordsFromDb);
            return Ok(incomesList);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> CreateNewIncomeRecord(long userId, IncomeForCreateDto incomeForCreateDto)
        {
            if (!IsUserAuthorized(userId))
                return Unauthorized();

            var bankAccountId = incomeForCreateDto.BankAccountId;
            var userFromDb = await _unitOfWork.Users.GetUserData(userId);

            if (!userFromDb.BankAccounts.Any(b => b.Id == bankAccountId))
                return BadRequest("Current User doesn't own this account!");

            var incomeForDb = _unitOfWork.Incomes.AddMoneyToBankAccount(userId, userFromDb, incomeForCreateDto, _mapper);                      

            if (await _unitOfWork.Complete() > 0)
            {
                var incomesList = _mapper.Map<IncomeForListDto>(incomeForDb);
                return Created(new Uri(Request.RequestUri + "/" + incomeForDb.Id), incomesList);
            }

            return BadRequest("An error happened while creating new income!");
        }

        private bool IsUserAuthorized(long userId)
        {
            if (userId != long.Parse(User.Identity.GetUserId()))
                return false;

            return true;
        }
    }
}
