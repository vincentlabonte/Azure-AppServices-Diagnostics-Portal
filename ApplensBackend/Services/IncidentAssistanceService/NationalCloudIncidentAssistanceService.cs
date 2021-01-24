using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppLensV3.Models;

namespace AppLensV3.Services
{
    public class NationalCloudIncidentAssistanceService : IIncidentAssistanceService
    {
        public async Task<bool> IsEnabled()
        {
            return false;
        }
        Task<string> IIncidentAssistanceService.GetIncidentInfo(string incidentId)
        {
            return null;
        }

        Task<string> IIncidentAssistanceService.ValidateIncident(string incidentId, object payload)
        {
            return null;
        }

        Task<string> IIncidentAssistanceService.UpdateIncident(string incidentId, object payload)
        {
            return null;
        }
    }
}
