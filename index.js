// index.js
const express = require('express');
const app = express();

// Puerto
const PORT = process.env.PORT || 3000;

// Middleware para leer JSON en las peticiones
app.use(express.json());

// 1. Ruta raíz '/'
app.get('/', (req, res) => {
  res.send('Hola Mundo desde Express. Este es mi primer servidor web');
});

// 2. Ruta GET '/saludo'
app.get('/saludo', (req, res) => {
  res.json({
    mensaje: 'Hola',
    autor: 'Falcon',
    fecha: new Date()
  });
});

// 3. Ruta POST '/datos'
app.post('/datos', (req, res) => {
  console.log(req.body);       // Para ver lo que envía el cliente

  res.json({
    mensaje: 'Datos recibidos correctamente',
    datos: req.body
  });
});

// Mock de datos
const usuarios = [
    { id: 1, nombre: 'Juan', edad: 28 },
    { id: 2, nombre: 'María', edad: 34 },
    { id: 3, nombre: 'Pedro', edad: 45 }
];

// POST /usuario
app.post('/usuario', (req, res) => {
  const { nombre, edad } = req.body;

  if (!nombre || !edad) {
    return res.status(400).json({
      mensaje: 'Faltan datos: nombre y edad son obligatorios'
    });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    edad
  };

  usuarios.push(nuevoUsuario);

  res.json({
    mensaje: 'Usuario agregado exitosamente',
    nuevo: nuevoUsuario,
    usuarios: usuarios
  });
});

app.put('/usuario/:id', (req, res) => {
  const { id } = req.params;          
  const { nombre, edad } = req.body;  

  const usuario = usuarios.find(u => u.id === Number(id));

  if (!usuario) {
    return res.status(404).json({
      mensaje: `No se encontró el usuario con id ${id}`
    });
  }

  if (nombre) usuario.nombre = nombre;
  if (edad)   usuario.edad   = edad;

  res.json({
    mensaje: 'Usuario actualizado correctamente',
    usuario,
    usuarios
  });
});

// DELETE /usuario/:id  -> eliminar usuario
app.delete('/usuario/:id', (req, res) => {
  const { id } = req.params;

  const index = usuarios.findIndex(u => u.id === Number(id));

  if (index === -1) {
    return res.status(404).json({
      mensaje: `No se encontró el usuario con id ${id}`
    });
  }

  const eliminado = usuarios[index];

  usuarios.splice(index, 1);

  res.json({
    mensaje: 'Usuario eliminado correctamente',
    eliminado,
    usuarios
  });
});

// 4. Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});
