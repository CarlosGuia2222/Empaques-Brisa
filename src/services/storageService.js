const CLIENTES_KEY = "empaques_brisa_clientes";
const COTIZACIONES_KEY = "empaques_brisa_cotizaciones";
const PEDIDOS_KEY = "empaques_brisa_pedidos";

const obtenerDatos = (key) => {
  const datos = localStorage.getItem(key);
  return datos ? JSON.parse(datos) : [];
};

const guardarDatos = (key, datos) => {
  localStorage.setItem(key, JSON.stringify(datos));
};

// CLIENTES
export const obtenerClientes = () => {
  return obtenerDatos(CLIENTES_KEY);
};

export const guardarCliente = (cliente) => {
  const clientes = obtenerClientes();

  const nuevoCliente = {
    id: crypto.randomUUID(),
    fechaRegistro: new Date().toISOString(),
    ...cliente,
  };

  const clientesActualizados = [...clientes, nuevoCliente];
  guardarDatos(CLIENTES_KEY, clientesActualizados);

  return nuevoCliente;
};

// COTIZACIONES
export const obtenerCotizaciones = () => {
  return obtenerDatos(COTIZACIONES_KEY);
};

export const guardarCotizacion = (cotizacion) => {
  const cotizaciones = obtenerCotizaciones();

  const nuevaCotizacion = {
    id: crypto.randomUUID(),
    fecha: new Date().toISOString(),
    estado: "Cotizado",
    ...cotizacion,
  };

  const cotizacionesActualizadas = [...cotizaciones, nuevaCotizacion];
  guardarDatos(COTIZACIONES_KEY, cotizacionesActualizadas);

  return nuevaCotizacion;
};

// PEDIDOS
export const obtenerPedidos = () => {
  return obtenerDatos(PEDIDOS_KEY);
};

export const guardarPedido = (pedido) => {
  const pedidos = obtenerPedidos();

  const nuevoPedido = {
    id: crypto.randomUUID(),
    fechaPedido: new Date().toISOString(),
    estadoPedido: "Recibido",
    actividades: [
      {
        fecha: new Date().toISOString(),
        descripcion: "Pedido registrado en el sistema",
      },
    ],
    ...pedido,
  };

  const pedidosActualizados = [...pedidos, nuevoPedido];
  guardarDatos(PEDIDOS_KEY, pedidosActualizados);

  return nuevoPedido;
};

export const actualizarEstadoPedido = (idPedido, nuevoEstado) => {
  const pedidos = obtenerPedidos();

  const pedidosActualizados = pedidos.map((pedido) => {
    if (pedido.id !== idPedido) return pedido;

    return {
      ...pedido,
      estadoPedido: nuevoEstado,
      actividades: [
        ...(pedido.actividades || []),
        {
          fecha: new Date().toISOString(),
          descripcion: `Estado actualizado a: ${nuevoEstado}`,
        },
      ],
    };
  });

  guardarDatos(PEDIDOS_KEY, pedidosActualizados);
  return pedidosActualizados;
};