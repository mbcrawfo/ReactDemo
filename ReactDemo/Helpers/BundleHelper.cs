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
        private const string LayoutEntryPoint = "layout";

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

            var files = manifest.Entrypoints?[entryPoint]?[type];
            if (files == null || entryPoint == LayoutEntryPoint)
            {
                return files ?? Enumerable.Empty<string>();
            }

            return files.FilterLayoutItems(manifest, type);
        }

        private static IEnumerable<string> FilterLayoutItems(
            this IEnumerable<string> files, 
            Manifest manifest,
            string type)
        {
            var layoutFiles = manifest.Entrypoints[LayoutEntryPoint][type];
            var layoutHash = new HashSet<string>(layoutFiles);

            foreach (var file in files)
            {
                if (!layoutHash.Contains(file))
                {
                    yield return file;
                }
            }
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