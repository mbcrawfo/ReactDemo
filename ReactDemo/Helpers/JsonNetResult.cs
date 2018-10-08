using System;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ReactDemo.Helpers
{
    public class JsonNetResult : JsonResult
    {
        private static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            ReferenceLoopHandling = ReferenceLoopHandling.Error
        };

        public JsonNetResult(JsonResult result)
        {
            ContentEncoding = result.ContentEncoding;
            ContentType = result.ContentType;
            Data = result.Data;
            JsonRequestBehavior = result.JsonRequestBehavior;
        }

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));

            var response = context.HttpContext.Response;

            if (Data == null)
            {
                return;
            }

            if (context.RequestContext.HttpContext.Request.RequestType == "GET" &&
                JsonRequestBehavior != JsonRequestBehavior.AllowGet)
            {
                throw new InvalidOperationException("GET not allowed");
            }

            if (ContentEncoding != null)
            {
                response.ContentEncoding = ContentEncoding;
            }

            response.ContentType = string.IsNullOrEmpty(ContentType) ? "application/json" : ContentType;

            var serializer = JsonSerializer.Create(Settings);
            serializer.Serialize(response.Output, Data);
        }
    }
}