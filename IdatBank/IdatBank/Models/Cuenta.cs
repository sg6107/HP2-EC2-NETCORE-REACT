using System.Collections.Generic;

namespace IdatBank.Models
{
    public class Cuenta
    {
        public int CuentaId { get; set; }
        public int ClienteId { get; set; }
        public string TipoCuenta { get; set; }
        public decimal Saldo { get; set; }

        public virtual Cliente Cliente { get; set; }
        public virtual ICollection<Movimiento> MovimientosOrigen { get; set; }
        public virtual ICollection<Movimiento> MovimientosDestino { get; set; }
    }
}

