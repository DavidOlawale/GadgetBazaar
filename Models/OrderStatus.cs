using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileStoreApp.Models
{
    public class OrderStatus
    {
        public OrderStatus(int id, string value)
        {
            this.Id = id;
            this.Value = value;
        }

        public int Id { get; set; }
        public string Value { get; set; }
    }
}
