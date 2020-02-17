using AutoMapper;
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
    [RoutePrefix("api/values")]
    public class ValuesController : ApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ValuesController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        [HttpGet]
        [Route("allThreeVals")]
        public async Task<IHttpActionResult> GetValues()
        {
            var vals = await _unitOfWork.Values.GetAll();

            var valsToreturn = _mapper.Map<IEnumerable<ValueDto>>(vals);

            return Ok(valsToreturn);

        }

        [HttpGet]
        [Route("{valId}")]
        [Authorize(Roles = "User")]
        public async Task<IHttpActionResult> GetValueById(int valId)
        {
            var valFromDb = await _unitOfWork.Values.SingleOrDefault(v => v.ValueId == valId);

            var mappedVal = _mapper.Map<ValueDto>(valFromDb);

            return Ok(valFromDb);
        }
    }
}
