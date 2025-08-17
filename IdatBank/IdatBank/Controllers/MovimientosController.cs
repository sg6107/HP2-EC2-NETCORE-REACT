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
    public class MovimientosController : ControllerBase
    {
        private readonly BancoDBContext _context;

        public MovimientosController(BancoDBContext context)
        {
            _context = context;
        }

        // GET: api/Movimientos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movimiento>>> GetMovimientos()
        {
            return await _context.Movimientos
                                 .Include(m => m.CuentaOrigen)
                                 .Include(m => m.CuentaDestino)
                                 .ToListAsync();
        }

        // GET: api/Movimientos/cuenta/5
        [HttpGet("cuenta/{cuentaId}")]
        public async Task<ActionResult<IEnumerable<Movimiento>>> GetMovimientosPorCuenta(int cuentaId)
        {
            var movimientos = await _context.Movimientos
                .Include(m => m.CuentaOrigen)
                .Include(m => m.CuentaDestino)
                .Where(m => m.CuentaOrigenId == cuentaId || m.CuentaDestinoId == cuentaId)
                .OrderByDescending(m => m.MovimientoId) // opcional: mostrar recientes primero
                .ToListAsync();

            if (movimientos == null || movimientos.Count == 0)
                return NotFound();

            return movimientos;
        }

        // POST: api/Movimientos
        [HttpPost]
        public async Task<ActionResult<Movimiento>> PostMovimiento([FromBody] Movimiento movimiento)
        {
            _context.Movimientos.Add(movimiento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovimientos), new { id = movimiento.MovimientoId }, movimiento);
        }

        // DELETE: api/Movimientos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovimiento(int id)
        {
            var movimiento = await _context.Movimientos.FindAsync(id);
            if (movimiento == null)
                return NotFound();

            _context.Movimientos.Remove(movimiento);
            await _context.SaveChangesAsync();

            return Ok(movimiento);
        }
    }
}

