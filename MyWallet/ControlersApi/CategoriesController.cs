using AutoMapper;
using MyWallet.Data;
using MyWallet.Data.DTO;
using MyWallet.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MyWallet2.ControlersApi
{
    [RoutePrefix("api/users/categories")]
    public class CategoriesController : ApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CategoriesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("expenseCategory")]
        public async Task<IHttpActionResult> CreateExpenseCategory(ExpenseCategoryDto expenseCategoryDto)
        {
            if (string.IsNullOrWhiteSpace(expenseCategoryDto.ExpenseCategoryName))
                return BadRequest("Category name is required!");

            var expenseCategoryForDb = _mapper.Map<ExpenseCategory>(expenseCategoryDto);

            _unitOfWork.ExpenseCategories.Add(expenseCategoryForDb);

            if (await _unitOfWork.Complete() > 0)
            {
                return Created(new Uri(Request.RequestUri + "/" + expenseCategoryForDb.Id), expenseCategoryForDb);
            }

            return BadRequest("An error happened while creating new expense category");
        }
        [HttpGet]
        [Route("expenseCategory")]
        public async Task<IHttpActionResult> GetExpenseCategories()
        {
            var expenseCategories = await _unitOfWork.ExpenseCategories.GetAll();

            var expenseCategoriesList = _mapper.Map<IEnumerable<ExpenseCategoryDto>>(expenseCategories);

            return Ok(expenseCategoriesList);
        }

        [HttpPost]
        [Route("incomeCategory")]
        public async Task<IHttpActionResult> CreateIncomeCaetgory(IncomeCategoryDto incomeCategoryDto)
        {
            if (string.IsNullOrWhiteSpace(incomeCategoryDto.IncomeCategoryName))
                return BadRequest("Category name is required!");

            var incomeCategoryForDb = _mapper.Map<IncomeCategory>(incomeCategoryDto);

            _unitOfWork.IncomeCategories.Add(incomeCategoryForDb);

            if(await _unitOfWork.Complete() > 0)
            {
                return Created(new Uri(Request.RequestUri + "/" + incomeCategoryForDb.Id), incomeCategoryForDb);
            }

            return BadRequest("An error happened while creating new income category");
        }

        [HttpGet]
        [Route("incomeCategory")]
        public async Task<IHttpActionResult> GetIncomeCategories()
        {
            var incomeCategories = await _unitOfWork.IncomeCategories.GetAll();

            var incomeCategoriesList = _mapper.Map<IEnumerable<IncomeCategoryDto>>(incomeCategories);

            return Ok(incomeCategoriesList);
        }

    }
}
