const Documento = require("../models/documento.model");
const Usuario = require("../models/usuario.model");

/**
 * Crea un nuevo documento, verificando primero que el usuario exista.
 * Aquí vive la lógica de negocio "pesada", separada del controlador.
 */
const crearDocumento = async ({ titulo, descripcion, usuarioId }) => {
  // Verificación de integridad referencial a nivel de negocio
  const usuarioExiste = await Usuario.findByPk(usuarioId);
  if (!usuarioExiste) {
    const error = new Error("El usuario especificado no existe");
    error.statusCode = 404;
    throw error;
  }

  const nuevoDocumento = await Documento.create({
    titulo,
    descripcion,
    usuarioId,
  });

  return nuevoDocumento;
};

const listarDocumentos = async () => {
  return await Documento.findAll({
    include: [{ model: Usuario, as: "usuario", attributes: ["id", "nombre"] }],
  });
};

const obtenerDocumentoPorId = async (id) => {
  const documento = await Documento.findByPk(id, {
    include: [{ model: Usuario, as: "usuario", attributes: ["id", "nombre"] }],
  });

  if (!documento) {
    const error = new Error("El documento no existe");
    error.statusCode = 404;
    throw error;
  }

  return documento;
};

const actualizarDocumento = async (id, datos) => {
  const documento = await obtenerDocumentoPorId(id);
  await documento.update(datos);
  return documento;
};

/**
 * Elimina un documento, verificando que quien lo solicita sea el dueño o un admin.
 */
const eliminarDocumento = async (id, usuarioSolicitante) => {
  const documento = await obtenerDocumentoPorId(id);

  const esDueno = documento.usuarioId === usuarioSolicitante.id;
  const esAdmin = usuarioSolicitante.rol === "admin";

  if (!esDueno && !esAdmin) {
    const error = new Error("No tienes permisos para eliminar este documento");
    error.statusCode = 403;
    throw error;
  }

  await documento.destroy();
};

module.exports = {
  crearDocumento,
  listarDocumentos,
  obtenerDocumentoPorId,
  actualizarDocumento,
  eliminarDocumento,
};
