const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta raíz '/'
app.get('/', (req, res) => {
  res.send('Hola Mundo desde Express. Este es mi primer servidor web');
});

// Ruta GET '/saludo'
app.get('/saludo', (req, res) => {
  res.json({
    mensaje: 'Hola',
    autor: 'Aquino Reyes Jorge Alfredo',
    fecha: new Date()
  });
});

// Ruta POST '/datos' 
app.post('/datos', (req, res) => {
  console.log('Datos recibidos en /datos:', req.body);

  res.json({
    mensaje: 'Datos recibidos',
    datos: req.body
  });
});

const usuarios = [
  { id: 1, nombre: 'Juan', edad: 28 },
  { id: 2, nombre: 'María', edad: 34 },
  { id: 3, nombre: 'Pedro', edad: 45 }
];
// GET /user -> listar usuarios
app.get('/user', (req, res) => {
  res.json({
    usuarios: usuarios
  });
});

// POST /user
app.post('/user', (req, res) => {
  /**
   * Estructura esperada del cuerpo de la petición:
   * {
   *   "nombre": String,
   *   "edad": Number
   * }
   */
  const cuerpo = req.body;

  const usuario = {
    id: usuarios.length + 1,
    nombre: cuerpo.nombre,
    edad: cuerpo.edad
  };

  usuarios.push(usuario);

  res.json({
    mensaje: 'Usuario agregado exitosamente (versión /user)',
    nuevo_usuario: usuario,
    usuarios_actualizdos: usuarios
  });
});

// PUT /user/:id
app.put('/user/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cuerpo = req.body;

  const usuarioIndex = usuarios.findIndex(u => u.id === id);
  if (usuarioIndex === -1) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado (versión /user)' });
  }

  usuarios[usuarioIndex].nombre = cuerpo.nombre || usuarios[usuarioIndex].nombre;
  usuarios[usuarioIndex].edad   = cuerpo.edad   || usuarios[usuarioIndex].edad;

  res.json({
    mensaje: 'Usuario actualizado exitosamente (versión /user)',
    usuario_actualizado: usuarios[usuarioIndex],
    usuarios_actualizdos: usuarios
  });
});

// DELETE /user/:id
app.delete('/user/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const usuarioIndex = usuarios.findIndex(u => u.id === id);
  if (usuarioIndex === -1) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado (versión /user)' });
  }

  const usuarioEliminado = usuarios.splice(usuarioIndex, 1);

  res.json({
    mensaje: 'Usuario eliminado exitosamente (versión /user)',
    usuario_eliminado: usuarioEliminado[0],
    usuarios_actualizdos: usuarios
  });
});
// POST /usuario
app.post('/usuario', (req, res) => {
  const { nombre, edad } = req.body;

    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    if (usuarioIndex === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuarios[usuarioIndex].nombre = cuerpo.nombre || usuarios[usuarioIndex].nombre;
    usuarios[usuarioIndex].edad = cuerpo.edad || usuarios[usuarioIndex].edad;

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

// PUT /usuario/:id
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

// DELETE /usuario/:id
app.delete('/usuario/:id', (req, res) => {
  const { id } = req.params;

  const index = usuarios.findIndex(u => u.id === Number(id));

  if (index === -1) {
    return res.status(404).json({
      mensaje: `No se encontró el usuario con id ${id} (versión /usuario)`
    });
  }

  const eliminado = usuarios[index];
  usuarios.splice(index, 1);

  res.json({
    mensaje: 'Usuario eliminado correctamente (versión /usuario)',
    eliminado,
    usuarios
  });
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});
