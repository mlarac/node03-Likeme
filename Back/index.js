const express = require('express');
const cors = require('cors');
const { query } = require('./coneccionBD');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const result = await query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener posts:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Nueva ruta POST para crear un post
app.post('/posts', async (req, res) => {
  try {
    const { titulo, img, descripcion} = req.body;
    const result = await query(
      'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3) RETURNING *',
      [titulo, img, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear post:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});