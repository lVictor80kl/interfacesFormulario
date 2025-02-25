import multer from "multer";
import path from "path";

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Los archivos se guardarán en la carpeta "uploads"
  },
  filename: function (req, file, cb) {
    // Nombre único para cada archivo
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filtro para aceptar solo archivos de tipografía (opcional)
const fileFilter = (req: any, file: any, cb: any) => {
  try{
    cb(null, true); // Aceptar el archivo
  } catch(error) {
    cb(new Error("Tipo de archivo no válido. Solo se permiten archivos .ttf y .otf"), false);
  }
};

// Configuración de multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;