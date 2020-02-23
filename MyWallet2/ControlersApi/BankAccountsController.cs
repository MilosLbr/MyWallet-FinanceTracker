using AutoMapper;
using Microsoft.AspNet.Identity;
using MyWallet.Data;
using MyWallet.Data.DTO;
using MyWallet.Services.Interfaces;
using System;
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

            return BadRequest("Error happened while creating new account!");
        }

        public bool IsUserAuthorized (long userId)
        {
            if (userId != long.Parse(User.Identity.GetUserId()))
                return false;

            return true;
        }

    }
}
