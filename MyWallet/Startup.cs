using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security.OAuth;
using MyWallet.Data.MyIdentitySample;
using MyWallet2.AutoMapperProfiles;
using MyWallet2.Providers;
using Owin;
using Microsoft.Owin.Cors;
using System.Web.Routing;

[assembly: OwinStartup(typeof(MyWallet2.Startup))]

namespace MyWallet2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            
            HttpConfiguration config = new HttpConfiguration();
            ConfigureOAuth(app);
            MapperConfig.RegisterProfiles();
            WebApiConfig.Register(config);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            app.UseCors(CorsOptions.AllowAll);
            app.UseWebApi(config);
        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<MyUserManager>(MyUserManager.Create);

            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/api/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new SimpleAuthorizationServerProvider(),
                AccessTokenFormat = new CustomJwtFormat()
            };

            // Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions()
            {
                AccessTokenFormat = new CustomJwtFormat()
            });

        }
    }
}
