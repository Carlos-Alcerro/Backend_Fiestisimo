const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const pathStorage = `public/images`;
    cb(null, pathStorage);
  },
  filename: function(req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const fileName = `file-${req.body.name.replace(/\s+/g, '_')}.${ext}`;
    cb(null, fileName);
  }
});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fieldSize: 25 * 1024 * 1024,
  },
});

module.exports = upload;

