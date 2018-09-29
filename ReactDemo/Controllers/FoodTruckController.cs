using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Hosting;
using System.Web.Mvc;
using Newtonsoft.Json;
using ReactDemo.Models;
using IOFile = System.IO.File;

namespace ReactDemo.Controllers
{
    public class FoodTrucksController : Controller
    {
        private static readonly List<FoodTruck> Trucks;

        static FoodTrucksController()
        {
            var path = HostingEnvironment.MapPath("~/mock_data.json");

            using (var stream = IOFile.OpenText(path))
            using (var reader = new JsonTextReader(stream))
            {
                var data = JsonSerializer.Create().Deserialize<MockData>(reader);
                Trucks = data.Trucks;
            }
        }

        private class MockData
        {
            public List<FoodTruck> Trucks { get; set; }
        }


        [HttpGet]
        public ActionResult Index()
        {
            var data = GetTruckData(1, 10, null, null, null);
            return View(data);
        }

        [HttpGet]
        public JsonResult GetTrucks(int page, int pageSize, string sortDirection, string sortName, string searchTerm)
        {
            var data = GetTruckData(page, pageSize, sortDirection, sortName, searchTerm);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        private PagedData<FoodTruck> GetTruckData(int page, int pageSize, string sortDirection, string sortName, string searchTerm)
        {
            var truckData = Trucks.AsEnumerable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                truckData = truckData.Where(t => t.Name.IndexOf(searchTerm, StringComparison.OrdinalIgnoreCase) >= 0);
            }

            switch (sortName)
            {
                case "rating" when sortDirection == "asc":
                    truckData = truckData.OrderBy(t => t.Rating);
                    break;

                case "rating" when sortDirection == "desc":
                    truckData = truckData.OrderByDescending(t => t.Rating);
                    break;

                case "name" when sortDirection == "desc":
                    truckData = truckData.OrderByDescending(t => t.Name);
                    break;

                case "name" when sortDirection == "asc":
                default:
                    truckData = truckData.OrderBy(t => t.Name);
                    break;
            }

            var skipCount = (page - 1) * pageSize;
            return new PagedData<FoodTruck>
            {
                TotalItems = Trucks.Count,
                // ReSharper disable once PossibleMultipleEnumeration
                FilteredItems = truckData.Count(),
                // ReSharper disable once PossibleMultipleEnumeration
                CurrentPage = truckData.Skip(skipCount).Take(pageSize)
            };
        }
    }
}