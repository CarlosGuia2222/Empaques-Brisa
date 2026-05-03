import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const CLIENTES_COLLECTION = "clientes";
const COTIZACIONES_COLLECTION = "cotizaciones";
const PEDIDOS_COLLECTION = "pedidos";

// CLIENTES
export const obtenerClientes = async () => {
  const consulta = query(
    collection(db, CLIENTES_COLLECTION),
    orderBy("fechaRegistro", "desc")
  );

  const snapshot = await getDocs(consulta);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
};

export const guardarCliente = async (cliente) => {
  const nuevoCliente = {
    ...cliente,
    fechaRegistro: new Date().toISOString(),
  };

  const referencia = await addDoc(
    collection(db, CLIENTES_COLLECTION),
    nuevoCliente
  );

  return {
    id: referencia.id,
    ...nuevoCliente,
  };
};

// COTIZACIONES
export const obtenerCotizaciones = async () => {
  const consulta = query(
    collection(db, COTIZACIONES_COLLECTION),
    orderBy("fecha", "desc")
  );

  const snapshot = await getDocs(consulta);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
};

export const guardarCotizacion = async (cotizacion) => {
  const nuevaCotizacion = {
    ...cotizacion,
    fecha: new Date().toISOString(),
    estado: "Cotizado",
  };

  const referencia = await addDoc(
    collection(db, COTIZACIONES_COLLECTION),
    nuevaCotizacion
  );

  return {
    id: referencia.id,
    ...nuevaCotizacion,
  };
};

// PEDIDOS
export const obtenerPedidos = async () => {
  const consulta = query(
    collection(db, PEDIDOS_COLLECTION),
    orderBy("fechaPedido", "desc")
  );

  const snapshot = await getDocs(consulta);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
};

export const guardarPedido = async (pedido) => {
  const nuevoPedido = {
    ...pedido,
    fechaPedido: new Date().toISOString(),
    estadoPedido: "Recibido",
    actividades: [
      {
        fecha: new Date().toISOString(),
        descripcion: "Pedido registrado en el sistema",
      },
    ],
  };

  const referencia = await addDoc(
    collection(db, PEDIDOS_COLLECTION),
    nuevoPedido
  );

  return {
    id: referencia.id,
    ...nuevoPedido,
  };
};

export const actualizarEstadoPedido = async (idPedido, nuevoEstado) => {
  const pedidos = await obtenerPedidos();
  const pedidoActual = pedidos.find((pedido) => pedido.id === idPedido);

  if (!pedidoActual) {
    throw new Error("No se encontró el pedido.");
  }

  const nuevasActividades = [
    ...(pedidoActual.actividades || []),
    {
      fecha: new Date().toISOString(),
      descripcion: `Estado actualizado a: ${nuevoEstado}`,
    },
  ];

  const referenciaPedido = doc(db, PEDIDOS_COLLECTION, idPedido);

  await updateDoc(referenciaPedido, {
    estadoPedido: nuevoEstado,
    actividades: nuevasActividades,
  });

  return {
    ...pedidoActual,
    estadoPedido: nuevoEstado,
    actividades: nuevasActividades,
  };
};