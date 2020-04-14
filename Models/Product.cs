using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace MobileStoreApp.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Model { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public int Price { get; set; }
        public string BatteryCapacity { get; set; }
        public string ChargingTime { get; set; }
        public string StandByTime { get; set; }
        public string Color { get; set; }
        public double SizeInGram { get; set; }
        public IEnumerable<Image> Images { get; set; }
    }
}