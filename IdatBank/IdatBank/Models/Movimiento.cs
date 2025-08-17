namespace IdatBank.Models
{
    public class Movimiento
    {
        public int MovimientoId { get; set; }
        public int? CuentaOrigenId { get; set; }
        public int? CuentaDestinoId { get; set; }
        public decimal Monto { get; set; }
        public string TipoMovimiento { get; set; }

        public virtual Cuenta CuentaOrigen { get; set; }
        public virtual Cuenta CuentaDestino { get; set; }
    }
}
