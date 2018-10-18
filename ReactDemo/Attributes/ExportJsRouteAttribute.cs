using System;

namespace ReactDemo.Attributes
{
    /// <summary>
    /// Tags an action to have its route exported for use in javascript.
    /// </summary>
    [AttributeUsage(AttributeTargets.Method)]
    public class ExportJsRouteAttribute : Attribute
    {
        public ExportJsRouteAttribute(string routeName)
        {
            if (string.IsNullOrWhiteSpace(routeName))
                throw new ArgumentException("Value cannot be null or whitespace.", nameof(routeName));

            RouteName = routeName;
        }

        public string RouteName { get; set; }
    }
}