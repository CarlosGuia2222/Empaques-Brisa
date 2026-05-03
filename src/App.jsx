import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Clientes from "./pages/Clientes";
import NuevaCotizacion from "./pages/NuevaCotizacion";
import Historial from "./pages/Historial";
import Pedidos from "./pages/Pedidos";
import "./App.css";

function App() {
  const [paginaActual, setPaginaActual] = useState("inicio");

  const renderPagina = () => {
    switch (paginaActual) {
      case "inicio":
        return <Inicio />;
      case "clientes":
        return <Clientes />;
      case "nuevaCotizacion":
        return <NuevaCotizacion />;
      case "historial":
        return <Historial />;
      case "pedidos":
        return <Pedidos />;
      default:
        return <Inicio />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar paginaActual={paginaActual} setPaginaActual={setPaginaActual} />

      <main className="main-content">
        <Header />
        {renderPagina()}
      </main>
    </div>
  );
}

export default App;

