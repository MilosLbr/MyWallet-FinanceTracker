using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace MyWallet2.Providers
{
    public class CustomJwtFormat : ISecureDataFormat<AuthenticationTicket>
    {
        public string Protect(AuthenticationTicket data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("data");
            }

            var claims = data.Identity.Claims;

            var tokenKey = Encoding.UTF8.GetBytes(ConfigurationManager.AppSettings.Get("key"));
            var key = new SymmetricSecurityKey(tokenKey);

            var signInCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = signInCredentials,
                Audience = "all",
                Issuer = "localhost"
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public AuthenticationTicket Unprotect(string protectedText)
        {
            var tokenKey = Encoding.UTF8.GetBytes(ConfigurationManager.AppSettings.Get("key"));
            var key = new SymmetricSecurityKey(tokenKey);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateLifetime = true,
                RequireSignedTokens = true,
                IssuerSigningKey = key,
                ValidAudience = "all",
                ValidIssuer = "localhost",
                ClockSkew = TimeSpan.Zero
            };

            var handler = new JwtSecurityTokenHandler();

            SecurityToken token = null;

            // Unpack token
            var unpacked = handler.ReadJwtToken(protectedText);
            string tstring = unpacked.RawData;

            var principal = handler.ValidateToken(tstring, tokenValidationParameters, out token);

            var identity = principal.Identities;

            return new AuthenticationTicket(identity.First(), new AuthenticationProperties());
        }
    }
}