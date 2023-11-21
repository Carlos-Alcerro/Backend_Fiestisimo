const cors = require('cors');

// Configuración de opciones de CORS
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  }, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const configCors = cors(corsOptions);

module.exports = configCors;