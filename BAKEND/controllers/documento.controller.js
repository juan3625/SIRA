const documentoService = require("../services/documento.service");

const crearDocumento = async (req, res, next) => {
  try {
    const { titulo, descripcion } = req.body;
    const usuarioId = req.usuario.id; // viene del token JWT, no del body (más seguro)

    // req.file lo agrega multer (ver middlewares/upload.middleware.js)
    const archivoInfo = req.file
      ? {
          ruta_archivo: `/uploads/documentos/${req.file.filename}`,
          formato: req.file.mimetype.split("/")[1],
          tamano: `${Math.round(req.file.size / 1024)} KB`,
        }
      : {};

    const nuevoDoc = await documentoService.crearDocumento({
      titulo,
      descripcion,
      usuarioId,
      ...archivoInfo,
    });

    return res.status(201).json({
      success: true,
      message: "Documento subido correctamente",
      data: nuevoDoc,
    });
  } catch (error) {
    next(error);
  }
};

const listar = async (req, res, next) => {
  try {
    const documentos = await documentoService.listarDocumentos();
    return res.status(200).json({
      success: true,
      message: "Documentos obtenidos correctamente",
      data: documentos,
    });
  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const documento = await documentoService.obtenerDocumentoPorId(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Documento encontrado",
      data: documento,
    });
  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const documento = await documentoService.actualizarDocumento(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Documento actualizado correctamente",
      data: documento,
    });
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    await documentoService.eliminarDocumento(req.params.id, req.usuario);
    return res.status(200).json({
      success: true,
      message: "Documento eliminado correctamente",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  crearDocumento,
  listar,
  obtenerPorId,
  actualizar,
  eliminar,
};
