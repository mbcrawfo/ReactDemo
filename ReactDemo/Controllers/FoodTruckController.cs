using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using ReactDemo.Models;

namespace ReactDemo.Controllers
{
    public class FoodTrucksController : Controller
    {
        private static readonly List<FoodTruck> FoodTrucks = new List<FoodTruck>
        {
            new FoodTruck
            {
                Id = 1,
                Name = "Wandering Moose",
                Description = "Serving slow cooked meats, scratch-made sauces, and fresh sides",
                Rating = 5
            },
            new FoodTruck
            {
                Id = 2,
                Name = "Cow and Oak",
                Description = "Oak City's premier mac & grilled cheese truck",
                Rating = 4
            }
        };

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
                MatchingItems = truckData.Count(),
                // ReSharper disable once PossibleMultipleEnumeration
                CurrentPage = truckData.Skip(skipCount).Take(pageSize)
            };
        }
    }
}