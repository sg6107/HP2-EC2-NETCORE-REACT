using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IdatBank.Models;
using System;


namespace IdatBank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentasController : ControllerBase
    {
        private readonly BancoDBContext _context;

        public CuentasController(BancoDBContext context)
        {
            _context = context;
        }

        // GET: api/Cuentas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cuenta>>> GetCuentas()
        {
            return await _context.Cuentas.Include(c => c.Cliente).ToListAsync();
        }

        // GET: api/Cuentas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cuenta>> GetCuenta(int id)
        {
            var cuenta = await _context.Cuentas.Include(c => c.Cliente)
                                               .FirstOrDefaultAsync(c => c.CuentaId == id);

            if (cuenta == null)
                return NotFound();

            return cuenta;
        }

        // GET: api/Cuentas/cliente/3
        [HttpGet("cliente/{clienteId}")]
        public async Task<ActionResult<IEnumerable<Cuenta>>> GetCuentasPorCliente(int clienteId)
        {
            var cuentas = await _context.Cuentas
                                        .Where(c => c.ClienteId == clienteId)
                                        .ToListAsync();

            if (cuentas == null || cuentas.Count == 0)
                return NotFound();

            return cuentas;
        }

        // POST: api/Cuentas/transferir
        [HttpPost("transferir")]
        public async Task<IActionResult> Transferir([FromBody] TransferRequest request)
        {
            var cuentaOrigen = await _context.Cuentas.FindAsync(request.CuentaOrigenId);
            var cuentaDestino = await _context.Cuentas.FindAsync(request.CuentaDestinoId);

            if (cuentaOrigen == null || cuentaDestino == null)
                return NotFound(new { mensaje = "Cuenta origen o destino no encontrada" });

            if (request.Monto <= 0)
                return BadRequest(new { mensaje = "Monto inválido" });

            if (cuentaOrigen.Saldo < request.Monto)
                return BadRequest(new { mensaje = "Saldo insuficiente" });

            // Actualizar saldos
            cuentaOrigen.Saldo -= request.Monto;
            cuentaDestino.Saldo += request.Monto;

            // Registrar movimiento
            var movimiento = new Movimiento
            {
                CuentaOrigenId = cuentaOrigen.CuentaId,
                CuentaDestinoId = cuentaDestino.CuentaId,
                Monto = request.Monto,
                TipoMovimiento = "Transferencia"
            };
            _context.Movimientos.Add(movimiento);

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    mensaje = "Transferencia exitosa",
                    movimiento = new
                    {
                        movimiento.CuentaOrigenId,
                        movimiento.CuentaDestinoId,
                        movimiento.Monto,
                        movimiento.TipoMovimiento
                    }
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensaje = "Error interno en la transferencia", detalle = ex.Message });
            }
        }

        // POST: api/Cuentas
        [HttpPost]
        public async Task<ActionResult<Cuenta>> PostCuenta([FromBody] Cuenta cuenta)
        {
            _context.Cuentas.Add(cuenta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCuenta), new { id = cuenta.CuentaId }, cuenta);
        }

        // PUT: api/Cuentas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCuenta(int id, [FromBody] Cuenta cuenta)
        {
            if (id != cuenta.CuentaId)
                return BadRequest();

            _context.Entry(cuenta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Cuentas.Any(e => e.CuentaId == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Cuentas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCuenta(int id)
        {
            var cuenta = await _context.Cuentas.FindAsync(id);
            if (cuenta == null)
                return NotFound();

            _context.Cuentas.Remove(cuenta);
            await _context.SaveChangesAsync();

            return Ok(cuenta);
        }
    }

    // Clase auxiliar para transferencias
    public class TransferRequest
    {
        public int CuentaOrigenId { get; set; }
        public int CuentaDestinoId { get; set; }
        public decimal Monto { get; set; }
    }
}

