using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts(int minPrice, int maxPrice , int brandId)
        {
            var products = _context.Products
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
            var product = await _context.Products
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
            var productToCompare = await _context.Products.FindAsync(id);
            var similarProducts = _context.Products
                .Where(product => product.Price >= productToCompare.Price / 2 || product.Price <= productToCompare.Price * 2 || product.BrandId == productToCompare.BrandId)
                .Take(10)
                .Include(product => product.ProductImages);

            return similarProducts;
        }

        [Authorize(Roles ="Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> PutProduct(int id, Product product)
        {
            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
