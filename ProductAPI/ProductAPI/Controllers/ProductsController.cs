/*
 * Name: Christopher Carbone
 * Date: 2/28/2021
 * Purpose: Full CRUD implementation
 * File: ProductController.cs
 */

using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using NLog;
using ProductAPI.Data;
using ProductAPI.Models;


// Project reference -> https://dzone.com/articles/use-aspnet-web-api-and-angular-to-build-a-simple-a
namespace ProductAPI.Controllers
{
    public class ProductsController : ApiController
    {
        //create reference to db and create logger object
        private ApplicationDbContext db = new ApplicationDbContext();
        private Logger logger = LogManager.GetLogger("fileLogger");

        // GET: api/Products
        public IQueryable<Product> GetAll()
        {
            return db.Products;
        }

        // GET: api/Products/5
        [ResponseType(typeof(Product))]
        public async Task<IHttpActionResult> Get(int id)
        {
            Product product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [HttpPut]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> Edit(int id, [FromBody]Product product)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.Id)
            {
                return BadRequest();
            }

            db.Entry(product).State = EntityState.Modified;

            //Concatonate _eddited if the object has not been edited yet.
            if(!product.Name.Contains("_editted"))
                product.Name = product.Name + "_editted";

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

            return StatusCode(HttpStatusCode.OK);
        }

        // POST: api/Products
        [ResponseType(typeof(Product))]
        public async Task<IHttpActionResult> Add([FromBody] Product product)
        {            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Products.Add(product);
            await db.SaveChangesAsync();

            //Create loggin directory if it does not exist yet
            if (!Directory.Exists("C:/logs"))
                Directory.CreateDirectory("C:/logs");
            logger.Info("Product Added: " + product.Name + " " + product.Id);
            return CreatedAtRoute("DefaultApi", new { id = product.Id }, product);
            //return StatusCode(HttpStatusCode.OK);
        }

        // DELETE: api/Products/5
        [HttpDelete]
        [ResponseType(typeof(Product))]
        public async Task<IHttpActionResult> Delete(int id)
        {
            Product product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            await db.SaveChangesAsync();

            //Create loggin directory if it does not exist yet
            if (!Directory.Exists("C:/logs"))
                Directory.CreateDirectory("C:/logs");
            logger.Info("Product Deleted: " + product.Name + " " + product.Id);
            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.Id == id) > 0;
        }
    }
}