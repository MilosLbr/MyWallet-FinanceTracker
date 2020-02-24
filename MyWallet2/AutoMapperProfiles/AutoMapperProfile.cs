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

            CreateMap<BankAccountCreateDto, BankAccount>();

            CreateMap<BankAccount, BankAccountForListDto>();
        }
    }
}