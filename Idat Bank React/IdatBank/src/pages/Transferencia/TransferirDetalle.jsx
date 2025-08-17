import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TransferirDineroDetalle() {
  const [transferencia, setTransferencia] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cliente = localStorage.getItem("cliente");
    if (!cliente) {
      navigate("/login"); 
      return;
    }

    const datosGuardados = localStorage.getItem("transferencia");
    if (datosGuardados) {
      setTransferencia(JSON.parse(datosGuardados));
    } else {
      navigate("/transferir");
    }
  }, [navigate]);

  const volverPerfil = () => {
    localStorage.removeItem("transferencia");
    navigate("/perfil");
  };

  if (!transferencia) return <p className="text-center mt-5">Cargando datos...</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Transferencia Exitosa</h2>

      <div className="card p-3 shadow">
        <p>
          <strong>Cuenta Origen:</strong> {transferencia.mensaje ? transferencia.movimiento.cuentaOrigenId : transferencia.cuentaOrigenId}
        </p>
        <p>
          <strong>Cuenta Destino:</strong> {transferencia.mensaje ? transferencia.movimiento.cuentaDestinoId : transferencia.cuentaDestinoId}
        </p>
        <p>
          <strong>Monto:</strong> S/ {transferencia.mensaje ? transferencia.movimiento.monto : transferencia.monto}
        </p>
        {transferencia.mensaje && <p><em>{transferencia.mensaje}</em></p>}
      </div>

      <button onClick={volverPerfil} className="btn btn-primary w-100 mt-4">
        Volver a Perfil
      </button>
    </div>
  );
}

export default TransferirDineroDetalle;



