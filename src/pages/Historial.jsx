import { useEffect, useState } from "react";
import {
  guardarPedido,
  obtenerCotizaciones,
  obtenerPedidos,
} from "../services/storageService";

function Historial() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    setCotizaciones(obtenerCotizaciones());
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

  const yaTienePedido = (cotizacionId) => {
    return pedidos.some((pedido) => pedido.cotizacionId === cotizacionId);
  };

  const generarPedido = (cotizacion) => {
    if (yaTienePedido(cotizacion.id)) {
      alert("Esta cotización ya fue convertida en pedido.");
      return;
    }

    const nuevoPedido = guardarPedido({
      cotizacionId: cotizacion.id,
      clienteNombre: cotizacion.clienteNombre,
      clienteTelefono: cotizacion.clienteTelefono,
      clienteCorreo: cotizacion.clienteCorreo,
      materialNombre: cotizacion.materialNombre,
      medidas: `${cotizacion.largo} x ${cotizacion.ancho} x ${cotizacion.alto}`,
      cantidad: cotizacion.cantidad,
      acabados: cotizacion.acabados,
      total: cotizacion.total,
      observaciones: "Pedido generado desde el historial de cotizaciones.",
    });

    setPedidos(obtenerPedidos());

    alert(`Pedido generado correctamente para ${nuevoPedido.clienteNombre}.`);
  };

  return (
    <section className="page">
      <div className="page-title">
        <h2>Historial de Cotizaciones</h2>
        <p>
          Consulta las cotizaciones guardadas y genera pedidos a partir de ellas.
        </p>
      </div>

      <div className="content-card">
        <h3>Cotizaciones registradas</h3>

        {cotizaciones.length === 0 ? (
          <p className="empty-text">
            Todavía no hay cotizaciones guardadas. Primero genera una nueva
            cotización.
          </p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Material</th>
                  <th>Medidas</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {cotizaciones.map((cotizacion) => (
                  <tr key={cotizacion.id}>
                    <td>{cotizacion.clienteNombre}</td>
                    <td>{formatearFecha(cotizacion.fecha)}</td>
                    <td>{cotizacion.materialNombre}</td>
                    <td>
                      {cotizacion.largo} x {cotizacion.ancho} x{" "}
                      {cotizacion.alto}
                    </td>
                    <td>{cotizacion.cantidad}</td>
                    <td>{formatearMoneda(cotizacion.total)}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          yaTienePedido(cotizacion.id) ? "pedido" : "cotizado"
                        }`}
                      >
                        {yaTienePedido(cotizacion.id) ? "Pedido" : "Cotizado"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="table-button"
                        onClick={() => generarPedido(cotizacion)}
                        disabled={yaTienePedido(cotizacion.id)}
                      >
                        {yaTienePedido(cotizacion.id)
                          ? "Pedido generado"
                          : "Generar pedido"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Historial;