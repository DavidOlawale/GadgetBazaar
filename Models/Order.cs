using System.Collections.Generic;

namespace MobileStoreApp.Models
{
    public class Order
    {
        public int Id { get; set; }
        public IEnumerable<OrderItem> OrderItems { get; set; }

    }
}