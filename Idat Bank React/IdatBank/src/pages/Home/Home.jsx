import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1>Bienvenido a IDAT BANK</h1>
      <Link to="/login" className="btn btn-primary mt-3">
        Ir al Login
      </Link>
    </div>
  );
}

export default Home;
