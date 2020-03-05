using AutoMapper;
using Microsoft.AspNet.Identity;
using MyWallet.Data;
using MyWallet.Data.DTO;
using MyWallet.Services.Interfaces;
using System;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MyWallet2.ControlersApi
{
    [RoutePrefix("api/users/{userId}/bankAccounts")]
    public class BankAccountsController : ApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public BankAccountsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetBankAccountsForCurrentUser(long userId)
        {
            if (!IsUserAuthorized(userId))
                return Unauthorized();

            var bankAccounts = await _unitOfWork.BankAccounts.Find(b => b.UserId == userId).ToListAsync();

            var bankAccountsList = _mapper.Map<List<BankAccountForListDto>>(bankAccounts);

            return Ok(bankAccountsList);

        }

        [HttpGet]
        [Route("accountsAndCategories")]
        public async Task<IHttpActionResult> GetBankAccountsAndCategoriesForUser(long userId)
        {
            if (!IsUserAuthorized(userId))
                return Unauthorized();

            var bankAccounts = await _unitOfWork.BankAccounts.GetBankAccountsAndTransactionCategories(userId);

            return Ok(bankAccounts);

        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> CreateAccount([FromBody]BankAccountCreateDto bankAccountCreateDto, long userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Account name is required!");
            }
            if (!IsUserAuthorized(userId))
                return Unauthorized();

            bankAccountCreateDto.UserId = userId;

            var bankAccount = _mapper.Map<BankAccount>(bankAccountCreateDto);

            _unitOfWork.BankAccounts.Add(bankAccount);

            if(await _unitOfWork.Complete() > 0)
            {
                return Created(new Uri(Request.RequestUri + "/" + bankAccount.Id), bankAccount);
            }

            return BadRequest("An error happened while creating new account!");
        }       

        [HttpDelete]
        [Route("{bankAccountId}")]
        public async Task<IHttpActionResult> DeleteBankAccount(long userId, int bankAccountId)
        {
            if (!IsUserAuthorized(userId))
                return Unauthorized();

            var userFromDb = await _unitOfWork.Users.GetUserData(userId);

            if (!userFromDb.BankAccounts.Any(b => b.Id == bankAccountId))
                return BadRequest("Current User doesn't own this account!");

            await _unitOfWork.BankAccounts.DeleteBankAccountAndAllTransactions(bankAccountId);

            if (await _unitOfWork.Complete() > 0)
            {
                return Ok("Deleted!");
            }

            return BadRequest("An error happened while deleting Bank account and it's transactions!");
        }

        private bool IsUserAuthorized (long userId)
        {
            if (userId != long.Parse(User.Identity.GetUserId()))
                return false;

            return true;
        }

    }
}
