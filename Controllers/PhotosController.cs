using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MobileStoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IWebHostEnvironment hostEnvironment;

        public PhotosController(IWebHostEnvironment hostEnvironment)
        {
            this.hostEnvironment = hostEnvironment;
        }

        [Authorize(Roles = "Admin")]
        [Route("products/{productId}/photos")]
        public ActionResult PostProductImage(int productId, IFormFile photo)
        {
            // wwwwroot/images
            var productImagesDirectory = Path.Combine(hostEnvironment.WebRootPath, "Images", "Products");
            var newImageName = new Guid().ToString() + Path.GetExtension(photo.FileName);

            var newImagePath = Path.Combine(productImagesDirectory, newImageName);
            using (var stream = new FileStream(newImagePath, FileMode.Create))
            {
                photo.CopyTo(stream);
            }

            return Created("", new object { });
        }
    }
}