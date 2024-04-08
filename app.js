const express = require('express');
const seed = require('./src/init.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta para obtener todos los usuarios
app.get('/api/gpt', async (req, res) => {
  const data = await seed(req);
  res.json({ data });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
