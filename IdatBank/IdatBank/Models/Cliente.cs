using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IdatBank.Models
{
    public class Cliente
    {
        public int ClienteId { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(100, ErrorMessage = "El nombre no puede tener más de 100 caracteres")]
        public string Nombre { get; set; }

        [Required]
        [StringLength(16, ErrorMessage = "La tarjeta debe tener máximo 16 dígitos")]
        public string NumeroTarjeta { get; set; }

        [Required]
        [Range(100000, 999999, ErrorMessage = "La clave debe tener 6 dígitos")]
        public int ClaveInternet { get; set; }

        public virtual ICollection<Cuenta> Cuentas { get; set; }
    }
}


