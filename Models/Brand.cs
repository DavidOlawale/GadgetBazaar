namespace MobileStoreApp.Models
{
    public class Brand
    {
        public Brand()
        {
        }
        public Brand(string name)
        {
            Name = name;
        }
        public int Id { get; set; }
        public string Name { get; set; }
    }
}