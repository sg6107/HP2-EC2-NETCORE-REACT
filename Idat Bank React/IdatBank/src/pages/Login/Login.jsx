import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTeclado = (num) => {
    setClave((prev) => prev + num);
  };

  const handleEliminar = () => {
    setClave((prev) => prev.slice(0, -1));
  };

  const handleBorrarTodo = () => {
    setClave("");
  };

  const handleLogin = async () => {
    if (!numeroTarjeta || !clave) {
      setError("Ingrese número de tarjeta y clave");
      return;
    }

    try {
      const response = await fetch("https://localhost:44320/api/Clientes/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numeroTarjeta: numeroTarjeta,
          claveInternet: clave,
        }),
      });

      if (!response.ok) {
        setError("Número de tarjeta o clave incorrectos");
        return;
      }

      const data = await response.json();

      localStorage.setItem("cliente", JSON.stringify(data));
      localStorage.setItem("isLoggedIn", "true");

      navigate("/perfil");
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">IDAT BANK - Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Número de Tarjeta</label>
          <input
            type="text"
            className="form-control"
            value={numeroTarjeta}
            onChange={(e) => setNumeroTarjeta(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Clave de Internet</label>
          <input type="password" className="form-control" value={clave} readOnly />
        </div>

        <div className="d-grid gap-2 d-md-block mb-3 text-center">
          {[1,2,3,4,5,6,7,8,9,0].map((num) => (
            <button
              key={num}
              className="btn btn-outline-primary m-1"
              onClick={() => handleTeclado(num)}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-warning" onClick={handleEliminar}>
            Eliminar
          </button>
          <button className="btn btn-danger" onClick={handleBorrarTodo}>
            Borrar Todo
          </button>
        </div>

        <button className="btn btn-success w-100" onClick={handleLogin}>
          Ingresar
        </button>
      </div>
    </div>
  );
}

export default Login;
