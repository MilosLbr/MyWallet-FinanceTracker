using AutoMapper;
using Microsoft.AspNet.Identity;
using MyWallet.Data.DTO;
//using MyWallet.Data.MyIdentityConfiguration;
using MyWallet.Data.MyIdentitySample;
using MyWallet.Services.Interfaces;
using MyWallet2.Controllers;
using MyWallet2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MyWallet2.ControlersApi
{
    // User accounts controler, used for registering users
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private readonly IAuthRepository _authRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AccountController(IAuthRepository authRepository, IMapper mapper , IUnitOfWork unitOfWork)
        {
            _authRepository = authRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userToCreate = _mapper.Map<MyUser>(userForRegisterDto);

            var result = await _authRepository.Register(userToCreate, userForRegisterDto.Password);

            
            if (result.Succeeded)
            {
                return StatusCode(HttpStatusCode.Created);
            }

            var resultError = result.Errors.ToList()[0];

            return BadRequest(resultError);
        }

        [HttpGet]
        [Route("{userId}/getUserData")]
        public async Task<IHttpActionResult> GetUserData(long userId)
        {
            var user = await _unitOfWork.Users.GetUserData(userId);

            var userDetails = _mapper.Map<UserForListDto>(user);

            return Ok(userDetails);
        }

        [HttpGet]
        [Route("{userId}/getUsersTransactions")]
        public async Task<IHttpActionResult> GetUsersTransactions(long userId)
        {
            if (!IsUserAuthorized(userId))
                return Unauthorized();

            var usersTransactions = await _unitOfWork.Users.GetAllUsersTransactions(userId);

            return Ok(usersTransactions);
        }

        [HttpGet]
        [Route("{userId}/getUsersTransactions/{bankAccountId}")]
        public async Task<IHttpActionResult> GetTransactionsOnBankAccount(long userId, int bankAccountId)
        {
            if (!IsUserAuthorized(userId))
                return Unauthorized();

            var userAndAccounts = await _unitOfWork.Users.GetUserAndBankAccounts(userId);

            if(!userAndAccounts.BankAccounts.Any(b => b.Id == bankAccountId))
                return BadRequest("Current User doesn't own this account!");


            var transactionsOnBankAccount = await _unitOfWork.Users.GetTransactionsOnBankAccount(userId, bankAccountId);

            return Ok(transactionsOnBankAccount);
        }

        private bool IsUserAuthorized(long userId)
        {
            if (userId != long.Parse(User.Identity.GetUserId()))
                return false;

            return true;
        }
    }
}
