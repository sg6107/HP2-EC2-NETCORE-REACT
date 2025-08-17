using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IdatBank.Models;

namespace IdatBank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly BancoDBContext _context;

        public ClientesController(BancoDBContext context)
        {
            _context = context;
        }

        // GET: api/Clientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            var clientes = await _context.Clientes
                .Include(c => c.Cuentas) // Cargar las cuentas relacionadas
                .Select(c => new
                {
                    c.ClienteId,
                    c.Nombre,
                    c.NumeroTarjeta,
                    c.ClaveInternet,
                    Cuentas = c.Cuentas.Select(a => new
                    {
                        a.CuentaId,
                        a.TipoCuenta,
                        a.Saldo
                    }).ToList()
                })
                .ToListAsync();

            return Ok(clientes);
        }


        // GET: api/Clientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(int id)
        {
            var cliente = await _context.Clientes
                .Include(c => c.Cuentas) // Cargar las cuentas relacionadas
                .Where(c => c.ClienteId == id)
                .Select(c => new
                {
                    c.ClienteId,
                    c.Nombre,
                    c.NumeroTarjeta,
                    c.ClaveInternet,
                    Cuentas = c.Cuentas.Select(a => new
                    {
                        a.CuentaId,
                        a.TipoCuenta,
                        a.Saldo
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (cliente == null)
                return NotFound();

            return Ok(cliente);
        }


        // POST: api/Clientes/login
        // Endpoint para login desde React
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var cliente = await _context.Clientes
                .Where(c => c.NumeroTarjeta == request.NumeroTarjeta
                         && c.ClaveInternet == request.ClaveInternet)
                .Select(c => new {
                    c.ClienteId,
                    c.Nombre,
                    c.NumeroTarjeta,
                    c.ClaveInternet,
                    Cuentas = c.Cuentas.Select(a => new {
                        a.CuentaId,
                        a.TipoCuenta,
                        a.Saldo
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (cliente == null)
                return StatusCode(401, new { mensaje = "Número de tarjeta o clave incorrecta" });

            return Ok(cliente);
        }


        // POST: api/Clientes
        [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente([FromBody] Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCliente), new { id = cliente.ClienteId }, cliente);
        }

        // PUT: api/Clientes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente(int id, [FromBody] Cliente cliente)
        {
            if (id != cliente.ClienteId)
                return BadRequest();

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Clientes.Any(e => e.ClienteId == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Clientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCliente(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
                return NotFound();

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();

            return Ok(cliente);
        }
    }

    // Clase auxiliar para login
    public class LoginRequest
    {
        public string NumeroTarjeta { get; set; }
        public int ClaveInternet { get; set; }
    }
}

