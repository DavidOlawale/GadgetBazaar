using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MobileStoreApp.Data;
using MobileStoreApp.Models;

namespace MobileStoreApp.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IWebHostEnvironment hostEnvironment;
        private readonly ApplicationDbContext dbContext;

        public PhotosController(IWebHostEnvironment hostEnvironment, ApplicationDbContext dbContext)
        {
            this.hostEnvironment = hostEnvironment;
            this.dbContext = dbContext;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{productId}/photos")]
        public ActionResult PostProductImage(int productId, IFormFile photo)
        {
            var imagesDirectory = Path.Combine(hostEnvironment.WebRootPath, "Images", "Products");
            if (!Directory.Exists(imagesDirectory))
                Directory.CreateDirectory(imagesDirectory);

            var newImageName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);

            var newImagePath = Path.Combine(imagesDirectory, newImageName);
            using (var stream = new FileStream(newImagePath, FileMode.Create))
            {
                photo.CopyTo(stream);
            }
            var image = new ProductImage { Name = $"/images/products/{newImageName}", ProductId = productId };
            dbContext.ProductImages.Add(image);
            dbContext.SaveChanges();

            return Created("", image);
        }

        [HttpGet("{productId}/photos")]
        public ActionResult GetProductImages(int productId)
        {
            return Ok(dbContext.ProductImages.Where(image => image.ProductId == productId));
        }
    }
}