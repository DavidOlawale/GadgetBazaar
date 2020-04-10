using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MobileStoreApp.Models
{
    public class Order
    {
        public int Id { get; set; }
        [Required]
        public string CustoerId { get; set; }
        public Customer Customer { get; set; }
        public IEnumerable<OrderItem> OrderItems { get; set; }

    }
}