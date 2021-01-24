using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Net.Http;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using AppLensV3.Helpers;
using AppLensV3.Models;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;

namespace AppLensV3.Services
{
    public interface IIncidentAssistanceService
    {
        Task<bool> IsEnabled();
        Task<string> GetIncidentInfo(string incidentId);
        Task<string> ValidateIncident(string incidentId, object payload);
        Task<string> UpdateIncident(string incidentId, object payload);
    }

    public class IncidentAssistanceService : IIncidentAssistanceService
    {
        private bool isEnabled;
        private readonly Lazy<HttpClient> _client = new Lazy<HttpClient>(() =>
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            return client;
        });

        private HttpClient _httpClient
        {
            get
            {
                return _client.Value;
            }
        }

        public IncidentAssistanceService(IConfiguration configuration)
        {
            if (!bool.TryParse(configuration["IncidentAssistance:IsEnabled"].ToString(), out isEnabled))
            {
                isEnabled = false;
            }
        }

        public async Task<bool> IsEnabled()
        {
            return isEnabled;
        }

        public async Task<string> GetIncidentInfo(string incidentId)
        {
            if (string.IsNullOrWhiteSpace(incidentId))
            {
                throw new ArgumentException("incidentId");
            }

            var result = "";

            return result;
        }

        public async Task<string> ValidateIncident(string incidentId, object payload)
        {
            if (string.IsNullOrWhiteSpace(incidentId))
            {
                throw new ArgumentException("incidentId");
            }

            //string authorizationToken = await GraphTokenService.Instance.GetAuthorizationTokenAsync();

            //HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, string.Format(GraphConstants.GraphUserApiEndpointFormat, userId));
            //request.Headers.Add("Authorization", authorizationToken);

            //CancellationTokenSource tokenSource = new CancellationTokenSource(TimeSpan.FromSeconds(60));
            //HttpResponseMessage responseMsg = await _httpClient.SendAsync(request, tokenSource.Token);

            string result = string.Empty;
            //AuthorInfo userInfo = null;

            /*if (responseMsg.IsSuccessStatusCode)
            {
                result = await responseMsg.Content.ReadAsStringAsync();
                dynamic resultObject = JsonConvert.DeserializeObject(result);

                userInfo = new AuthorInfo(
                    resultObject.businessPhones.ToString(),
                    resultObject.displayName.ToString(),
                    resultObject.givenName.ToString(),
                    resultObject.jobTitle.ToString(),
                    resultObject.mail.ToString(),
                    resultObject.officeLocation.ToString(),
                    resultObject.userPrincipalName.ToString());
            }*/

            return result;
        }

        public async Task<string> UpdateIncident(string incidentId, object payload)
        {
            if (string.IsNullOrWhiteSpace(incidentId))
            {
                throw new ArgumentException("incidentId");
            }

            /*string authorizationToken = await GraphTokenService.Instance.GetAuthorizationTokenAsync();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, string.Format(GraphConstants.GraphUserImageApiEndpointFormat, userId));
            request.Headers.Add("Authorization", authorizationToken);

            CancellationTokenSource tokenSource = new CancellationTokenSource(TimeSpan.FromSeconds(60));
            HttpResponseMessage responseMsg = await _httpClient.SendAsync(request, tokenSource.Token);

            string result = string.Empty;

            // If the status code is 404 NotFound, it might because the user doesn't have a profile picture, or the user alias is invalid.
            // We set the image string to be empty if the response is not successful
            if (responseMsg.IsSuccessStatusCode)
            {
                var content = Convert.ToBase64String(await responseMsg.Content.ReadAsByteArrayAsync());
                result = string.Concat("data:image/jpeg;base64,", content);
            }*/

            return "";
        }
    }
}