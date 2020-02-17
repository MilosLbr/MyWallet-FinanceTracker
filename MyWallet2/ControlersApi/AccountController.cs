using AutoMapper;
using Microsoft.AspNet.Identity;
using MyWallet.Data.DTO;
using MyWallet.Data.MyIdentityConfiguration;
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
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private readonly IAuthRepository _authRepository;
        private readonly IMapper _mapper;

        public AccountController(IAuthRepository authRepository, IMapper mapper)
        {
            _authRepository = authRepository;
            _mapper = mapper;
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
            var userToCreate = _mapper.Map<AspNetUser>(userForRegisterDto);

            var result = await _authRepository.Register(userToCreate, userForRegisterDto.Password);

            if (result.Succeeded)
            {
                return StatusCode(HttpStatusCode.Created);
            }

            return BadRequest("An error has ocured");
        }

        

    }
}
