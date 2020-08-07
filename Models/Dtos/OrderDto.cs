using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MobileStoreApp.Models.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }

        [Required]
        public string CustomerId { get; set; }
        public IEnumerable<OrderItem> OrderItems { get; set; }
    }
}
