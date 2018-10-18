using System.Web;
using System.Web.Mvc;
using ReactDemo.Helpers;

namespace ReactDemo
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new JsonNetActionFilter());
            filters.Add(new HandleErrorAttribute());

            #if DEBUG
            filters.Add(new ExportRoutesActionFilterAttribute("~/app/routes.ts", "IRouteTable", "routes"));
            #endif
        }

        private class JsonNetActionFilter : ActionFilterAttribute
        {
            public override void OnActionExecuted(ActionExecutedContext filterContext)
            {
                if (filterContext.Result is JsonResult result)
                {
                    filterContext.Result = new JsonNetResult(result);
                }

                base.OnActionExecuted(filterContext);
            }
        }
    }
}
