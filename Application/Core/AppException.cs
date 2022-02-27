using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException
    {
        public AppException(int stauseCode, string message, string details = null)
        {
            StauseCode = stauseCode;
            Message = message;
            Details = details;
        }

        public int StauseCode { get; set; }
        public string Message { get; set; }
        public string? Details { get; set; }
    }
}