const multer = require("multer");
const path = require("path");

const FORMATOS_PERMITIDOS = [".pdf", ".doc", ".docx"];
const MAX_SIZE_MB = process.env.MAX_FILE_SIZE_MB || 10;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR || "./uploads");
  },
  filename: (req, file, cb) => {
    const nombreUnico = `archivo_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, nombreUnico);
  },
});

const filtroArchivo = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (!FORMATOS_PERMITIDOS.includes(extension)) {
    const error = new Error("Formato de archivo no permitido. Solo se aceptan: PDF, DOC, DOCX");
    error.statusCode = 400;
    return cb(error, false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: filtroArchivo,
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
});

module.exports = upload;
