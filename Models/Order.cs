using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MobileStoreApp.Models
{
    public class Order
    {
        public int Id { get; set; }
        [Required]
        public string CustomerId { get; set; }
        public Customer Customer { get; set; }
        public IEnumerable<OrderItem> OrderItems { get; set; }
        public int StatusId { get; set; }
        public OrderStatus Status { get; set; }

    }
}