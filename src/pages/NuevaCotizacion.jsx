import { useEffect, useState } from "react";
import { materiales } from "../data/materiales";
import {
  guardarCotizacion,
  obtenerClientes,
} from "../services/storageService";

function NuevaCotizacion() {
  const [clientes, setClientes] = useState([]);
  const [cotizacionGuardada, setCotizacionGuardada] = useState(null);

  const [formulario, setFormulario] = useState({
    clienteId: "",
    largo: "",
    ancho: "",
    alto: "",
    cantidad: "",
    materialId: "",
    acabados: "",
  });

  useEffect(() => {
    setClientes(obtenerClientes());
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const obtenerClienteSeleccionado = () => {
    return clientes.find((cliente) => cliente.id === formulario.clienteId);
  };

  const obtenerMaterialSeleccionado = () => {
    return materiales.find((material) => material.id === formulario.materialId);
  };

  const calcularPrecio = () => {
    const largo = Number(formulario.largo);
    const ancho = Number(formulario.ancho);
    const alto = Number(formulario.alto);
    const cantidad = Number(formulario.cantidad);
    const material = obtenerMaterialSeleccionado();

    if (!largo || !ancho || !alto || !cantidad || !material) {
      return 0;
    }

    const precioBase = (largo + ancho + alto) * material.costoBase * cantidad;
    const costoAcabados = formulario.acabados.trim() ? precioBase * 0.08 : 0;

    return precioBase + costoAcabados;
  };

  const guardarNuevaCotizacion = (e) => {
    e.preventDefault();

    const cliente = obtenerClienteSeleccionado();
    const material = obtenerMaterialSeleccionado();
    const total = calcularPrecio();

    if (
      !cliente ||
      !formulario.largo ||
      !formulario.ancho ||
      !formulario.alto ||
      !formulario.cantidad ||
      !material
    ) {
      alert("Completa cliente, medidas, cantidad y material.");
      return;
    }

    const nuevaCotizacion = guardarCotizacion({
      clienteId: cliente.id,
      clienteNombre: cliente.nombre,
      clienteTelefono: cliente.telefono,
      clienteCorreo: cliente.correo,
      largo: Number(formulario.largo),
      ancho: Number(formulario.ancho),
      alto: Number(formulario.alto),
      cantidad: Number(formulario.cantidad),
      materialId: material.id,
      materialNombre: material.nombre,
      materialTipo: material.tipo,
      materialResistencia: material.resistencia,
      costoBase: material.costoBase,
      acabados: formulario.acabados || "Sin acabados especiales",
      total,
    });

    setCotizacionGuardada(nuevaCotizacion);

    setFormulario({
      clienteId: "",
      largo: "",
      ancho: "",
      alto: "",
      cantidad: "",
      materialId: "",
      acabados: "",
    });

    alert("Cotización guardada correctamente en el historial.");
  };

  const totalCalculado = calcularPrecio();
  const clienteSeleccionado = obtenerClienteSeleccionado();
  const materialSeleccionado = obtenerMaterialSeleccionado();

  return (
    <section className="page">
      <div className="page-title">
        <h2>Nueva Cotización</h2>
        <p>
          Captura los datos del empaque para calcular automáticamente el precio
          de la cotización.
        </p>
      </div>

      <div className="content-card">
        <h3>Formulario de cotización</h3>

        {clientes.length === 0 ? (
          <p className="empty-text">
            Primero registra al menos un cliente en el módulo Clientes.
          </p>
        ) : (
          <form className="form-grid" onSubmit={guardarNuevaCotizacion}>
            <div className="form-group">
              <label>Cliente</label>
              <select
                name="clienteId"
                value={formulario.clienteId}
                onChange={manejarCambio}
              >
                <option value="">Selecciona un cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Material</label>
              <select
                name="materialId"
                value={formulario.materialId}
                onChange={manejarCambio}
              >
                <option value="">Selecciona un material</option>
                {materiales.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.nombre} - {material.resistencia}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Largo</label>
              <input
                type="number"
                name="largo"
                value={formulario.largo}
                onChange={manejarCambio}
                placeholder="Ej. 40"
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Ancho</label>
              <input
                type="number"
                name="ancho"
                value={formulario.ancho}
                onChange={manejarCambio}
                placeholder="Ej. 30"
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Alto</label>
              <input
                type="number"
                name="alto"
                value={formulario.alto}
                onChange={manejarCambio}
                placeholder="Ej. 20"
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Cantidad</label>
              <input
                type="number"
                name="cantidad"
                value={formulario.cantidad}
                onChange={manejarCambio}
                placeholder="Ej. 100"
                min="1"
              />
            </div>

            <div className="form-group full-width">
              <label>Acabados especiales</label>
              <textarea
                name="acabados"
                value={formulario.acabados}
                onChange={manejarCambio}
                placeholder="Ej. Impresión, refuerzo, color especial..."
                rows="3"
              />
            </div>

            <div className="quote-preview full-width">
              <h3>Resumen de cotización</h3>

              <div className="preview-grid">
                <p>
                  <strong>Cliente:</strong>{" "}
                  {clienteSeleccionado
                    ? clienteSeleccionado.nombre
                    : "Sin seleccionar"}
                </p>

                <p>
                  <strong>Material:</strong>{" "}
                  {materialSeleccionado
                    ? materialSeleccionado.nombre
                    : "Sin seleccionar"}
                </p>

                <p>
                  <strong>Medidas:</strong>{" "}
                  {formulario.largo || 0} x {formulario.ancho || 0} x{" "}
                  {formulario.alto || 0}
                </p>

                <p>
                  <strong>Cantidad:</strong> {formulario.cantidad || 0}
                </p>
              </div>

              <div className="total-box">
                Total estimado:{" "}
                <strong>
                  ${totalCalculado.toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  MXN
                </strong>
              </div>
            </div>

            <button className="primary-button" type="submit">
              Guardar cotización
            </button>
          </form>
        )}
      </div>

      {cotizacionGuardada && (
        <div className="content-card success-card">
          <h3>Cotización generada</h3>
          <p>
            Se guardó correctamente la cotización de{" "}
            <strong>{cotizacionGuardada.clienteNombre}</strong> por un total de{" "}
            <strong>
              $
              {cotizacionGuardada.total.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              MXN
            </strong>
            .
          </p>
        </div>
      )}
    </section>
  );
}

export default NuevaCotizacion;