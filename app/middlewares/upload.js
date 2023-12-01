const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.memoryStorage(); // Almacenamos la imagen en memoria

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fieldSize: 25 * 1024 * 1024,
  },
}).single('image'); // Asumiendo que estás enviando la imagen con el nombre 'image'

module.exports = upload;


