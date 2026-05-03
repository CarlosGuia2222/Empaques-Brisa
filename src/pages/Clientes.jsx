import { useEffect, useState } from "react";
import { guardarCliente, obtenerClientes } from "../services/storageService";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
  });

  const cargarClientes = async () => {
    try {
      setCargando(true);
      const clientesFirebase = await obtenerClientes();
      setClientes(clientesFirebase);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
      alert("No se pudieron cargar los clientes desde Firebase.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const registrarCliente = async (e) => {
    e.preventDefault();

    if (
      !formulario.nombre.trim() ||
      !formulario.telefono.trim() ||
      !formulario.correo.trim() ||
      !formulario.direccion.trim()
    ) {
      alert("Completa todos los campos para registrar al cliente.");
      return;
    }

    try {
      setGuardando(true);

      await guardarCliente(formulario);
      await cargarClientes();

      setFormulario({
        nombre: "",
        telefono: "",
        correo: "",
        direccion: "",
      });

      alert("Cliente registrado correctamente en Firebase.");
    } catch (error) {
      console.error("Error al guardar cliente:", error);
      alert("No se pudo guardar el cliente en Firebase.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <section className="page">
      <div className="page-title">
        <h2>Clientes</h2>
        <p>
          Registro y consulta de clientes del sistema de cotización de Empaques Brisa.
        </p>
      </div>

      <div className="content-card">
        <h3>Registrar cliente</h3>

        <form className="form-grid" onSubmit={registrarCliente}>
          <div className="form-group">
            <label>Nombre del cliente</label>
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ej. Fernando Méndez"
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formulario.telefono}
              onChange={manejarCambio}
              placeholder="Ej. 8112345678"
            />
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={formulario.correo}
              onChange={manejarCambio}
              placeholder="Ej. cliente@correo.com"
            />
          </div>

          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formulario.direccion}
              onChange={manejarCambio}
              placeholder="Ej. Monterrey, Nuevo León"
            />
          </div>

          <button className="primary-button" type="submit" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar cliente"}
          </button>
        </form>
      </div>

      <div className="content-card">
        <h3>Clientes registrados</h3>

        {cargando ? (
          <p className="empty-text">Cargando clientes desde Firebase...</p>
        ) : clientes.length === 0 ? (
          <p className="empty-text">
            Todavía no hay clientes registrados.
          </p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Dirección</th>
                </tr>
              </thead>

              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.correo}</td>
                    <td>{cliente.direccion}</td>
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

export default Clientes;