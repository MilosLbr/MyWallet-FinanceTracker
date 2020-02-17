using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyWallet2.AutoMapperProfiles
{
    public class MapperConfig
    {
        public static IMapper Mapper { get; set; }
        public static void RegisterProfiles()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AutoMapperProfile>();
            });

            Mapper = config.CreateMapper();
        }
    }
}