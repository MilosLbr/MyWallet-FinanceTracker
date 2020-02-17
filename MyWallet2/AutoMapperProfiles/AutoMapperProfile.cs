using AutoMapper;
using MyWallet.Data;
using MyWallet.Data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MyWallet.Data.MyIdentityConfiguration;

namespace MyWallet2.AutoMapperProfiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Value, ValueDto>();

            CreateMap<UserForRegisterDto, MyWallet.Data.MyIdentityConfiguration.AspNetUser>();


        }
    }
}