import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import PerfilCuenta from "./pages/Perfil/PerfilCuenta";
import TransferirDinero from "./pages/Transferencia/TransferirDinero";
import TransferirDetalle from "./pages/Transferencia/TransferirDetalle";
import NotFound from "./pages/Error/NotFound";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<PerfilCuenta />} />
        <Route path="/transferir" element={<TransferirDinero />} />
        <Route path="/transferir-detalle" element={<TransferirDetalle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;



