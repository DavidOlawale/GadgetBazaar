using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MobileStoreApp.Data;
using MobileStoreApp.Models;
using MobileStoreApp.Models.Dtos;

namespace MobileStoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public OrdersController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _context = context;
            this._userManager = userManager;
            this._mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles ="Admin")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders
                .Include(order => order.Customer)
                .Include(order => order.OrderItems)
                .ThenInclude(item => item.Product)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
                return NotFound();
            order.Customer = await _context.Customers.FindAsync(order.CustomerId);
            order.OrderItems = _context.OrderItems.Where(item => item.OrderId == order.Id)
                .Include(item => item.Product)
                .ThenInclude(p => p.ProductImages)
                .ToList();

            return order;
        }

        //Get orders for a particular user
        [HttpGet("MyOrder")]
        public async Task<ActionResult<IEnumerable<Order>>> GetMyOrders()
        {
            var user = await _userManager.GetUserAsync(User);
            return _context.Orders.Where(order => order.CustomerId == user.Id).ToList();
        }

        [HttpPut("{id}")]
        [Authorize("Customer")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
                return BadRequest();

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                    return NotFound();
                    throw;
            }

            return NoContent();
        }


        [HttpPost]
        [Authorize(Roles ="Customer")]
        public async Task<ActionResult<Order>> PostOrder(OrderDto orderDto)
        {
            var order = _mapper.Map<Order>(orderDto);
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("orders", new { id = order.Id }, order);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles ="Admin, Customer")]
        public async Task<ActionResult<Order>> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound();

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
