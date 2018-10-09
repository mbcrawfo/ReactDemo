using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web.Hosting;
using System.Web.Mvc;
using Newtonsoft.Json;
using ReactDemo.Models;
using IOFile = System.IO.File;

namespace ReactDemo.Controllers
{
    public class FoodTrucksController : Controller
    {
        private static readonly List<FoodTruck> FoodTrucks;
        private static readonly Dictionary<int, List<FoodTruckMenuItem>> FoodTruckMenuItems;
        private static readonly Dictionary<int, List<FoodTruckScheduleEntry>> FoodTruckSchedules;

        static FoodTrucksController()
        {
            var path = HostingEnvironment.MapPath("~/mock_data.json");

            using (var stream = IOFile.OpenText(path))
            using (var reader = new JsonTextReader(stream))
            {
                var data = JsonSerializer.Create().Deserialize<MockData>(reader);
                FoodTrucks = data.Trucks;
                
                FoodTruckMenuItems = data.MenuItems
                    .GroupBy(m => m.FoodTruckId)
                    .ToDictionary(g => g.Key, g => g.ToList());

                FoodTruckSchedules = data.Schedules
                    .GroupBy(s => s.FoodTruckId)
                    .ToDictionary(g => g.Key, g => g.ToList());
            }
        }

        private class MockData
        {
            public List<FoodTruck> Trucks { get; set; }

            public List<FoodTruckMenuItem> MenuItems { get; set; }

            public List<FoodTruckScheduleEntry> Schedules { get; set; }
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

        [HttpPost]
        public ActionResult DeleteTruck(int foodTruckId)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public ActionResult GetMenu(int foodTruckId)
        {
            if (!FoodTruckMenuItems.TryGetValue(foodTruckId, out var menu))
            {
                return HttpNotFound();
            }

            return Json(menu, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetSchedule(int foodTruckId)
        {
            if (!FoodTruckSchedules.TryGetValue(foodTruckId, out var schedule))
            {
                return HttpNotFound();
            }

            return Json(schedule, JsonRequestBehavior.AllowGet);
        }

        private PagedData<FoodTruck> GetTruckData(int page, int pageSize, string sortDirection, string sortName, string searchTerm)
        {
            var truckData = FoodTrucks.AsEnumerable();

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
                TotalItems = FoodTrucks.Count,
                // ReSharper disable once PossibleMultipleEnumeration
                FilteredItems = truckData.Count(),
                // ReSharper disable once PossibleMultipleEnumeration
                CurrentPage = truckData.Skip(skipCount).Take(pageSize)
            };
        }
    }
}