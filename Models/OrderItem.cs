namespace MobileStoreApp.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public string CustoerId { get; set; }
        public Customer Customer { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
        public int OrderId { get; set; }
    }
}