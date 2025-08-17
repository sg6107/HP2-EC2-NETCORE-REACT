import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PerfilCuenta() {
  const [cliente, setCliente] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const datos = localStorage.getItem("cliente");
    if (datos) {
      const clienteData = JSON.parse(datos);
      setCliente({ ...clienteData, cuentas: [] });

      fetch(`https://localhost:44320/api/Cuentas/cliente/${clienteData.clienteId}`)
        .then(res => res.json())
        .then(cuentas => {
          const sueldoCuenta = cuentas.find(c => c.tipoCuenta === "Sueldo") || {};
          const ahorrosCuenta = cuentas.find(c => c.tipoCuenta === "Ahorros") || {};
          setCliente({
            ...clienteData,
            sueldo: sueldoCuenta.saldo || 0,
            ahorros: ahorrosCuenta.saldo || 0
          });
        })
        .catch(err => console.error(err));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("cliente");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  if (!cliente) {
    return <p className="text-center mt-5">Cargando datos...</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Bienvenido, {cliente.nombre}</h2>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Cuenta Sueldo</h5>
          <p className="card-text">Saldo: <strong>S/ {cliente.sueldo}</strong></p>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Cuenta Ahorros</h5>
          <p className="card-text">Saldo: <strong>S/ {cliente.ahorros}</strong></p>
        </div>
      </div>

      <div className="d-grid gap-2">
        <button
          className="btn btn-success"
          onClick={() => navigate("/transferir")}
        >
          Transferir Dinero
        </button>
        <button
          className="btn btn-danger"
          onClick={cerrarSesion}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default PerfilCuenta;

