import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TransferirDinero() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [monto, setMonto] = useState("");
  const [cuentas, setCuentas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const datos = localStorage.getItem("cliente");
    if (!datos) {
      navigate("/login");
      return;
    }
    const clienteData = JSON.parse(datos);

    fetch(`https://localhost:44320/api/Cuentas/cliente/${clienteData.clienteId}`)
      .then(res => res.json())
      .then(data => setCuentas(data))
      .catch(err => console.error(err));
  }, [navigate]);

  const transferir = async (e) => {
    e.preventDefault();

    const cuentaOrigen = cuentas.find(c => c.cuentaId === parseInt(origen));
    if (!cuentaOrigen) {
      alert("Cuenta origen inválida");
      return;
    }

    const datos = {
      cuentaOrigenId: parseInt(origen),
      cuentaDestinoId: parseInt(destino),
      monto: parseFloat(monto)
    };

    try {
      const respuesta = await fetch("https://localhost:44320/api/Cuentas/transferir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      if (respuesta.ok) {
        const result = await respuesta.json();
        localStorage.setItem("transferencia", JSON.stringify(result));
        navigate("/transferir-detalle");
      } else {
        const errData = await respuesta.json();
        alert(errData.mensaje || "Error en la transferencia");
      }
    } catch (error) {
      console.error(error);
      alert("No se pudo conectar con el servidor");
    }
  };

  // 🔹 Función para volver al perfil
  const volverPerfil = () => {
    navigate("/perfil");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Transferir Dinero</h2>
      <form onSubmit={transferir}>
        <div className="mb-3">
          <label className="form-label">Cuenta Origen</label>
          <select
            className="form-select"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
            required
          >
            <option value="">Seleccione</option>
            {cuentas.map(c => (
              <option key={c.cuentaId} value={c.cuentaId}>
                {c.tipoCuenta} - S/ {c.saldo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Cuenta Destino</label>
          <input
            type="number"
            className="form-control"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Monto</label>
          <input
            type="number"
            className="form-control"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 mb-3">
          Transferir
        </button>

        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={volverPerfil}
        >
          Volver a Perfil
        </button>
      </form>
    </div>
  );
}

export default TransferirDinero;

