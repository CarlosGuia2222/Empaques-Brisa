import { useEffect, useState } from "react";
import {
  actualizarEstadoPedido,
  obtenerPedidos,
} from "../services/storageService";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  const estadosPedido = ["Recibido", "En producción", "Enviado", "Entregado"];

  useEffect(() => {
    setPedidos(obtenerPedidos());
  }, []);

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatearMoneda = (cantidad) => {
    return Number(cantidad).toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  const cambiarEstado = (idPedido, nuevoEstado) => {
    actualizarEstadoPedido(idPedido, nuevoEstado);
    setPedidos(obtenerPedidos());
  };

  const obtenerClaseEstado = (estado) => {
    switch (estado) {
      case "Recibido":
        return "recibido";
      case "En producción":
        return "produccion";
      case "Enviado":
        return "enviado";
      case "Entregado":
        return "entregado";
      default:
        return "recibido";
    }
  };

  return (
    <section className="page">
      <div className="page-title">
        <h2>Pedidos</h2>
        <p>
          Consulta los pedidos generados desde cotizaciones y actualiza su estado
          de seguimiento.
        </p>
      </div>

      {pedidos.length === 0 ? (
        <div className="content-card">
          <h3>Sin pedidos registrados</h3>
          <p className="empty-text">
            Todavía no hay pedidos generados. Primero crea una cotización y
            conviértela en pedido desde el módulo Historial.
          </p>
        </div>
      ) : (
        <div className="orders-grid">
          {pedidos.map((pedido) => (
            <div className="order-card" key={pedido.id}>
              <div className="order-card-header">
                <div>
                  <h3>{pedido.clienteNombre}</h3>
                  <p>Pedido generado el {formatearFecha(pedido.fechaPedido)}</p>
                </div>

                <span
                  className={`order-status ${obtenerClaseEstado(
                    pedido.estadoPedido
                  )}`}
                >
                  {pedido.estadoPedido}
                </span>
              </div>

              <div className="order-info-grid">
                <p>
                  <strong>Teléfono:</strong> {pedido.clienteTelefono}
                </p>

                <p>
                  <strong>Correo:</strong> {pedido.clienteCorreo}
                </p>

                <p>
                  <strong>Material:</strong> {pedido.materialNombre}
                </p>

                <p>
                  <strong>Medidas:</strong> {pedido.medidas}
                </p>

                <p>
                  <strong>Cantidad:</strong> {pedido.cantidad}
                </p>

                <p>
                  <strong>Total:</strong> {formatearMoneda(pedido.total)}
                </p>
              </div>

              <div className="order-section">
                <h4>Acabados especiales</h4>
                <p>{pedido.acabados}</p>
              </div>

              <div className="order-section">
                <h4>Actualizar estado del pedido</h4>

                <select
                  className="status-select"
                  value={pedido.estadoPedido}
                  onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                >
                  {estadosPedido.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>

              <div className="order-section">
                <h4>Historial de actividades</h4>

                <div className="activity-list">
                  {(pedido.actividades || []).map((actividad, index) => (
                    <div className="activity-item" key={index}>
                      <span className="activity-dot"></span>
                      <div>
                        <p>{actividad.descripcion}</p>
                        <small>{formatearFecha(actividad.fecha)}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Pedidos;