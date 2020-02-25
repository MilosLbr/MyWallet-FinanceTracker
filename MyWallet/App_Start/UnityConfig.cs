using AutoMapper;
using MyWallet.Services.Implementation;
using MyWallet.Services.Interfaces;
using MyWallet2.AutoMapperProfiles;
using MyWallet2.Controllers;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace MyWallet2
{
    public static class UnityConfig
    {
        public static IUnityContainer RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterInstance<IMapper>(MapperConfig.Mapper);
            container.RegisterType<IUnitOfWork, UnitOfWork>();
            container.RegisterType<IAuthRepository, AuthRepository>();

            //GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);

            return container;
        }
    }
}