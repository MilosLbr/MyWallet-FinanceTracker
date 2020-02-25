
using AutoMapper;
using Microsoft.AspNet.Identity;
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
    [RoutePrefix("api/users/{userId}/expenses")]
    public class ExpensesController : ApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ExpensesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetExpenseRecordsForUser(long userId)
        {
            if (!IsUserAuthorized(userId))
                return Unauthorized();

            var expenseRecordsFromDb = await _unitOfWork.Expenses.Find(e => e.UserId == userId).ToListAsync();

            var expensesList = _mapper.Map<List<ExpensesForListDto>>(expenseRecordsFromDb);
            return Ok(expensesList);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> CreateNewExpenseRecord(long userId, ExpenseForCreateDto expenseForCreateDto)
        {
            if (!IsUserAuthorized(userId))
                return Unauthorized();

            var bankAccountId = expenseForCreateDto.BankAccountId;
            var userFromDb = await _unitOfWork.Users.GetUserData(userId);

            if (!userFromDb.BankAccounts.Any(b => b.Id == bankAccountId))
                return BadRequest("Current User doesn't own this account!");

            var expenseForDb = _unitOfWork.Expenses.SubtractMoneyFromBankAccount(userId, userFromDb, expenseForCreateDto, _mapper);

            if(await _unitOfWork.Complete() > 0)
            {
               
                var expensesList = _mapper.Map<ExpensesForListDto>(expenseForDb);
                
                return Created(new Uri(Request.RequestUri + "/" + expenseForDb.Id), expensesList);
            }

            return BadRequest("An error happened while creating new expense!");
        }

        private bool IsUserAuthorized(long userId)
        {
            if (userId != long.Parse(User.Identity.GetUserId()))
                return false;

            return true;
        }
    }
}
