using System;
using Newtonsoft.Json;

namespace ReactDemo.Models
{
    public class FoodTruckScheduleEntry
    {
        public int FoodTruckId { get; set; }

        public string LocationName { get; set; }

        public string Address { get; set; }

        public DateTime Start => Date.Add(TimeSpan.Parse(StartTime));

        public DateTime End => Date.Add(TimeSpan.Parse(EndTime));

        public DateTime Date { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }
    }
}