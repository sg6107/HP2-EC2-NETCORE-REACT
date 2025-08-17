import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-3 text-danger">404</h1>
      <h2 className="mb-3">Página no encontrada</h2>
      <p className="text-muted">
        La ruta a la que intentas acceder no existe o ha sido movida.
      </p>

      <Link to="/" className="btn btn-primary mt-3">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;
