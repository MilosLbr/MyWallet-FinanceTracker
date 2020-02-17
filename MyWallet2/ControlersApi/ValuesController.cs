using AutoMapper;
using MyWallet.Data;
using MyWallet.Data.DTO;
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
        private readonly MyWalletContext _context;
        private readonly IMapper _mapper;


        public ValuesController(MyWalletContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet]
        [Route("allThreeVals")]
        public async Task<IHttpActionResult> GetValues()
        {
            var vals = await _context.Values.ToListAsync();

            var valsToreturn = _mapper.Map<IEnumerable<ValueDto>>(vals);

            return Ok(valsToreturn);

        }

        [HttpGet]
        [Route("{valId}")]
        [Authorize(Roles = "User")]
        public async Task<IHttpActionResult> GetValueById(int valId)
        {
            var valFromDb = await _context.Values.FirstOrDefaultAsync(v => v.ValueId == valId);

            var mappedVal = _mapper.Map<ValueDto>(valFromDb);

            return Ok(valFromDb);
        }
    }
}
