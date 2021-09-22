using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MobileStoreApp.Data;
using MobileStoreApp.Models;

namespace MobileStoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly IWebHostEnvironment hostEnvironment;

        public ProductsController(IWebHostEnvironment hostEnvironment, ApplicationDbContext context)
        {
            this.hostEnvironment = hostEnvironment;
            db = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts(int minPrice, int maxPrice , int brandId)
        {
            var products = db.Products
                .Include(p => p.Brand)
                .Include(p => p.ProductImages) as IQueryable<Product>;

            if (minPrice != 0)
                products = products.Where(p => p.Price >= minPrice);

            if (maxPrice != 0)
                products = products.Where(p => p.Price <= maxPrice);

            if (brandId!= 0)
                products = products.Where(p => p.Brand.Id == brandId);

            return products.ToList();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await db.Products
                .Include(p => p.Brand)
                .Include(p => p.ProductImages)
                .SingleOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            return product;
        }

        [HttpGet("{id}/similar")]
        public async Task<IEnumerable<Product>> GetSimilarProductsAsync(int id)
        {
            var productToCompare = await db.Products.FindAsync(id);
            var similarProducts = db.Products
                .Where(product => product.Price >= productToCompare.Price / 2 || product.Price <= productToCompare.Price * 2 || product.BrandId == productToCompare.BrandId)
                .Take(10)
                .Include(product => product.ProductImages);

            return similarProducts;
        }

        [Authorize(Roles ="Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> PutProduct(int id, Product product)
        {
            db.Entry(product).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return product;
        }

        [Authorize(Roles ="Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            db.Products.Add(product);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteProduct(int id)
        {
            var product = await db.Products.FindAsync(id);
            if (product == null) return NotFound();
            try
            {
                foreach (var image in db.ProductImages.Where(i => i.ProductId == product.Id))
                {
                    System.IO.File.Delete($"{hostEnvironment.WebRootPath}{image.Name}");
                }
            }
            catch { }
            db.Products.Remove(product);
            await db.SaveChangesAsync();
            return true;
        }

        [Authorize(Roles ="Admin")]
        [HttpGet("{id}/archive")]
        public async Task<ActionResult<Product>> ArchiveProduct(int id)
        {
            var product = await db.Products.FindAsync(id);
            if (product == null) return NotFound();
            product.IsArchived = true;
            db.Products.Update(product);
            await db.SaveChangesAsync();
            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}/unarchive")]
        public async Task<ActionResult<Product>> UnArchiveProduct(int id)
        {
            var product = await db.Products.FindAsync(id);
            if (product == null) return NotFound();
            product.IsArchived = false;
            db.Products.Update(product);
            await db.SaveChangesAsync();
            return Ok(product);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Any(e => e.Id == id);
        }
    }
}
