using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using Newtonsoft.Json;

namespace ReactDemo.Helpers
{
    public static class BundleHelper
    {
        private const string ManifestFile = "~/webpack-assets.json";
        private const string ManifestKey = "WebpackManifest";

        public static IEnumerable<string> GetAssets(string entryPoint, string type)
        {
            if (!(HttpContext.Current?.Items[ManifestKey] is Manifest manifest))
            {
                manifest = LoadManifest();

                if (HttpContext.Current != null)
                {
                    HttpContext.Current.Items[ManifestKey] = manifest;
                }
            }

            return manifest.Entrypoints?[entryPoint]?[type] ?? Enumerable.Empty<string>();
        }

        private static Manifest LoadManifest()
        {
            var filePath = HostingEnvironment.MapPath(ManifestFile);

            using (var stream = File.OpenText(filePath))
            using (var reader = new JsonTextReader(stream))
            {
                return JsonSerializer.Create().Deserialize<Manifest>(reader);
            }
        }

        private class Manifest
        {
            public Dictionary<string, Dictionary<string, List<string>>> Entrypoints { get; set; }
        }
    }
}