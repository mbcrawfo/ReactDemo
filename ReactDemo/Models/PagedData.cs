using System.Collections.Generic;

namespace ReactDemo.Models
{
    public class PagedData<T>
    {
        public int TotalItems { get; set; }

        public int MatchingItems { get; set; }

        public IEnumerable<T> CurrentPage { get; set; }
    }
}