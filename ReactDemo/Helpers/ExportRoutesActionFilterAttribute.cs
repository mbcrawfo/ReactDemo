﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Routing;
using ReactDemo.Attributes;

namespace ReactDemo.Helpers
{
    public class ExportRoutesActionFilterAttribute : ActionFilterAttribute
    {
        private bool _outputWritten = false;

        public ExportRoutesActionFilterAttribute(string outputPath, string routeInterfaceName, string routeVariableName)
        {
            OutputPath = outputPath;
            RouteInterfaceName = routeInterfaceName;
            RouteVariableName = routeVariableName;
        }

        public string OutputPath { get; }

        public string RouteInterfaceName { get; }

        public string RouteVariableName { get; }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (_outputWritten)
            {
                return;
            }

            var routes = LoadRoutes(filterContext.RequestContext);
            var content = GenerateFileContent(routes);
            var contentHash = GenerateSHA256(content);
            var path = HostingEnvironment.MapPath(OutputPath);

            if (!OutputRequired(path, contentHash))
            {
                return;
            }

            File.WriteAllText(path, content, Encoding.UTF8);
            _outputWritten = true;
        }

        private string GenerateFileContent(List<Route> routes)
        {
            var sb = new StringBuilder();

            sb.AppendFormat(@"// THIS FILE IS AUTOMATICALLY GENERATED.  DO NOT MANUALLY EDIT ITS CONTENTS.

export interface {0} {{
", RouteInterfaceName);

            foreach (var route in routes)
            {
                sb.AppendFormat("    readonly {0}: string;\n", route.Name);
            }

            sb.AppendFormat(@"}}

export const {0}: {1} = {{
", RouteVariableName, RouteInterfaceName);

            foreach (var route in routes)
            {
                sb.AppendFormat("    {0}: '{1}',\n", route.Name, route.Url);
            }

            sb.AppendFormat(@"}};

export default {0};
", RouteVariableName);

            return sb.ToString();
        }

        private static List<Route> LoadRoutes(RequestContext requestContext)
        {
            var url = new UrlHelper(requestContext);

            return Assembly.GetExecutingAssembly()
                .GetTypes()
                .Where(t => t.IsClass && !t.IsAbstract && typeof(Controller).IsAssignableFrom(t))
                .SelectMany(t => t.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly))
                .Where(mi => mi.GetCustomAttribute<ExportJsRouteAttribute>() != null)
                .Select(mi => new Route
                {
                    Name = mi.GetCustomAttribute<ExportJsRouteAttribute>().RouteName,
                    Url = url.Action(mi.Name, GetControllerName(mi.DeclaringType.Name))
                })
                .OrderBy(r => r.Name)
                .ToList();

            string GetControllerName(string typeName)
            {
                const string postFix = "Controller";
                if (!typeName.EndsWith(postFix))
                {
                    return typeName;
                }

                return typeName.Remove(typeName.Length - postFix.Length);
            }
        }

        private static bool OutputRequired(string path, string expectedHash)
        {
            if (!File.Exists(path))
            {
                return true;
            }

            var existingContent = File.ReadAllText(path);
            return GenerateSHA256(existingContent) != expectedHash;
        }

        private static string GenerateSHA256(string s)
        {
            if (s == null) 
                throw new ArgumentNullException(nameof(s));

            var provider = new SHA256CryptoServiceProvider();
            var bytes = Encoding.UTF8.GetBytes(s);
            var hashBytes = provider.ComputeHash(bytes);
            var sb = new StringBuilder(hashBytes.Length * 2);

            foreach (var b in hashBytes)
            {
                sb.Append(b.ToString("x2"));
            }

            return sb.ToString();
        }

        private class Route
        {
            public string Name { get; set; }
            public string Url { get; set; }
        }
    }
}