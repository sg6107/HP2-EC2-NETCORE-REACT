using Microsoft.EntityFrameworkCore;

namespace IdatBank.Models
{
    public class BancoDBContext : DbContext
    {
        public BancoDBContext(DbContextOptions<BancoDBContext> options)
            : base(options) { }

        public virtual DbSet<Cliente> Clientes { get; set; }
        public virtual DbSet<Cuenta> Cuentas { get; set; }
        public virtual DbSet<Movimiento> Movimientos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
                optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=IDATBank;Integrated Security=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración de Cliente
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(e => e.ClienteId);
                entity.Property(e => e.Nombre).HasMaxLength(100).IsRequired();
                entity.Property(e => e.NumeroTarjeta).HasMaxLength(16).IsRequired();
                entity.Property(e => e.ClaveInternet).IsRequired();
            });

            // Configuración de Cuenta
            modelBuilder.Entity<Cuenta>(entity =>
            {
                entity.HasKey(e => e.CuentaId);
                entity.Property(e => e.TipoCuenta).HasMaxLength(20).IsRequired();
                entity.Property(e => e.Saldo).HasColumnType("decimal(18,2)").IsRequired();
                entity.HasOne(d => d.Cliente).WithMany(p => p.Cuentas).HasForeignKey(d => d.ClienteId);
            });

            // Configuración de Movimiento
            modelBuilder.Entity<Movimiento>(entity =>
            {
                entity.HasKey(e => e.MovimientoId);
                entity.Property(e => e.TipoMovimiento).HasMaxLength(20).IsRequired();
                entity.Property(e => e.Monto).HasColumnType("decimal(18,2)").IsRequired();
                entity.HasOne(d => d.CuentaOrigen)
                      .WithMany(p => p.MovimientosOrigen)
                      .HasForeignKey(d => d.CuentaOrigenId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(d => d.CuentaDestino)
                      .WithMany(p => p.MovimientosDestino)
                      .HasForeignKey(d => d.CuentaDestinoId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}

