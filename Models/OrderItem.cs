namespace MobileStoreApp.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public string CustoerId { get; set; }
        public Customer Customer { get; set; }
        public int DeviceId { get; set; }
        public Device Device { get; set; }
        public int Quantity { get; set; }
        public int OrderId { get; set; }
    }
}