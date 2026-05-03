function Sidebar({ paginaActual, setPaginaActual }) {
  const menuItems = [
    { id: "inicio", label: "Inicio", icon: "🏠" },
    { id: "clientes", label: "Clientes", icon: "👥" },
    { id: "nuevaCotizacion", label: "Nueva Cotización", icon: "🧾" },
    { id: "historial", label: "Historial", icon: "📋" },
    { id: "pedidos", label: "Pedidos", icon: "📦" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">EB</div>
        <div>
          <h2>Empaques Brisa</h2>
          <p>Sistema de cotización</p>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${paginaActual === item.id ? "active" : ""}`}
            onClick={() => setPaginaActual(item.id)}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;