import StatCard from "../components/StatCard";

function Inicio() {
  return (
    <section className="page">
      <div className="page-title">
        <h2>Panel principal</h2>
        <p>
          Accesos principales del sistema de cotización y gestión de pedidos de
          Empaques Brisa.
        </p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Clientes"
          value="Gestión"
          icon="👥"
          description="Consulta y registro de clientes"
        />

        <StatCard
          title="Cotizaciones"
          value="Cálculo"
          icon="🧾"
          description="Generación de nuevas cotizaciones"
        />

        <StatCard
          title="Historial"
          value="Registro"
          icon="📋"
          description="Consulta de cotizaciones anteriores"
        />

        <StatCard
          title="Pedidos"
          value="Seguimiento"
          icon="📦"
          description="Control del estado de pedidos"
        />
      </div>

      <div className="content-card">
        <h3>Objetivo del sistema</h3>
        <p>
          El sistema web de Empaques Brisa tiene como finalidad facilitar el
          proceso de cotización de empaques, permitiendo registrar clientes,
          capturar las medidas del producto, seleccionar materiales, calcular el
          precio automáticamente, guardar el historial de cotizaciones y dar
          seguimiento a los pedidos generados.
        </p>
      </div>

      <div className="content-card">
        <h3>Módulos del sistema</h3>

        <div className="module-grid">
          <div className="module-card">
            <h4>Clientes</h4>
            <p>Registro y consulta de información de contacto.</p>
          </div>

          <div className="module-card">
            <h4>Nueva Cotización</h4>
            <p>Captura de medidas, cantidad, material y acabados especiales.</p>
          </div>

          <div className="module-card">
            <h4>Historial</h4>
            <p>Consulta de cotizaciones guardadas por cliente o fecha.</p>
          </div>

          <div className="module-card">
            <h4>Pedidos</h4>
            <p>Seguimiento del estado: recibido, producción, enviado y entregado.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Inicio;