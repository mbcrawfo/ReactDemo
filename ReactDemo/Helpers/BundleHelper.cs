using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ReactDemo.Helpers
{
    public static class BundleHelper
    {
        private const string BundleMapFile = "~/webpack-assets.json";

        public static string GetPath(string bundleName, string type = "js")
        {
            var filePath = HostingEnvironment.MapPath(BundleMapFile);
            if (string.IsNullOrEmpty(filePath) || !File.Exists(filePath))
            {
                throw new InvalidOperationException();
            }

            using (var file = File.OpenText(filePath))
            using (var reader = new JsonTextReader(file))
            {
                var json = JObject.Load(reader);

                var path = json.SelectToken(bundleName)?.Value<string>(type);
                if (string.IsNullOrEmpty(path))
                {
                    throw new InvalidOperationException();
                }

                return path;
            }
        }
    }
}