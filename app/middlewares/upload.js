const multer = require('multer');

const fileFilter = (req, file, cb) => {
  // Comprueba si el archivo cumple con los criterios deseados
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // Acepta el archivo
    req.messagge = "El archivo es válido";
    cb(null, true);
  } else {
    // Rechaza el archivo
    req.messagge = "El archivo no es válido";
    cb(null, false);
  }
};
const storage = multer.diskStorage({
  destination: function(req, filename, cb) {
    const pathStorage = `public/images`
    cb(null, pathStorage)
  },
  filename: function(req, filename, cb) {
      const ext = filename.originalname.split(".").pop();
      const file = `file-${req.body.name.replace(/\s+/g, '_')}.${ext}`;
    cb(null, file)
  }
});

const upload = multer({ storage: storage, fileFilter:fileFilter });

module.exports = upload;