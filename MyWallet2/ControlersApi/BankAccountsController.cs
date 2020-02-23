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
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MyWallet2.ControlersApi
{
    [RoutePrefix("api/bankAccounts")]
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
        public async Task<IHttpActionResult> CreateAccount(BankAccountCreateDto bankAccountCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Account name is required!");
            }

            var userId = HttpContext.Current.User.Identity.GetUserName();
            bankAccountCreateDto.UserId = userId;

            var bankAccount = _mapper.Map<BankAccount>(bankAccountCreateDto);

            _unitOfWork.BankAccounts.Add(bankAccount);

            if(await _unitOfWork.Complete() > 0)
            {
                return Created(new Uri(Request.RequestUri + "/" + bankAccount.Id), bankAccount);
            }

            return BadRequest("Error happened while creating new account!");
        }

    }
}
