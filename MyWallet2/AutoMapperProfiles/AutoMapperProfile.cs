using AutoMapper;
using MyWallet.Data;
using MyWallet.Data.DTO;
using MyWallet.Data.MyIdentitySample;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using MyWallet.Data.MyIdentityConfiguration;

namespace MyWallet2.AutoMapperProfiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Value, ValueDto>();
                        
            CreateMap<UserForRegisterDto, MyUser>();
            CreateMap<MyUser, UserForListDto>();
            CreateMap<User, UserForListDto>();

            CreateMap<BankAccountCreateDto, BankAccount>();

            CreateMap<BankAccount, BankAccountForListDto>(); 
            CreateMap<BankAccountForListDto, BankAccount>();

            CreateMap<Income, IncomeForListDto>();
            CreateMap<IncomeForCreateDto, Income>();

            CreateMap<IncomeCategory, IncomeCategoryDto>();
            CreateMap<IncomeCategoryDto, IncomeCategory>();
        }
    }
}