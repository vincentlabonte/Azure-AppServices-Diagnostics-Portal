using System;
using AppLensV3.Helpers;
using AppLensV3.Services.TokenService;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

namespace AppLensV3.Services
{
    public class IncidentAssistanceTokenService : TokenServiceBase
    {
        private static readonly Lazy<IncidentAssistanceTokenService> instance = new Lazy<IncidentAssistanceTokenService>(() => new IncidentAssistanceTokenService());

        public static IncidentAssistanceTokenService Instance => instance.Value;

        /// <inheritdoc/>
        protected override AuthenticationContext AuthenticationContext { get; set; }

        /// <inheritdoc/>
        protected override ClientCredential ClientCredential { get; set; }

        /// <inheritdoc/>
        protected override string Resource { get; set; }

        /// <summary>
        /// Initializes Graph Token Service with provided config.
        /// </summary>
        public void Initialize(IConfiguration configuration)
        {
            AuthenticationContext = new AuthenticationContext(configuration["IncidentAssistanceTokenService:TenantAuthorityUrl"]);
            ClientCredential = new ClientCredential(configuration["IncidentAssistanceTokenService:ClientId"], configuration["IncidentAssistanceTokenService:AppKey"]);
            Resource = configuration["IncidentAssistanceTokenService:Resource"];
            StartTokenRefresh();
        }
    }
}
