const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// configurar la aplicación express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'felipe0228',
  database: 'accesorios-electronicos'
});

// conectar a la base de datos MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

// definir las rutas de la API
const router = express.Router();
router.get('/', (req, res) => {
  res.json({ message: 'API de accesorios electrónicos' });
});

// obtener todos los accesorios electrónicos
router.get('/accesorios', (req, res) => {
  const sql = 'SELECT * FROM accesorios';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// obtener un accesorio electrónico por ID
router.get('/accesorios/:accesorio_id', (req, res) => {
  const sql = `SELECT * FROM accesorios WHERE id=${req.params.accesorio_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// crear un accesorio electrónico
router.post('/accesorios', (req, res) => {
  const accesorio = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio
  };
  const sql = 'INSERT INTO accesorios SET ?';
  db.query(sql, accesorio, (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Accesorio creado!' });
  });
});

// actualizar un accesorio electrónico
router.put('/accesorios/:accesorio_id', (req, res) => {
  const sql = `UPDATE accesorios SET nombre='${req.body.nombre}', descripcion='${req.body.descripcion}', precio=${req.body.precio} WHERE id=${req.params.accesorio_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Accesorio actualizado!' });
  });
});

// eliminar un accesorio electrónico
router.delete('/accesorios/:accesorio_id', (req, res) => {
  const sql = `DELETE FROM accesorios WHERE id=${req.params.accesorio_id}`;
  db.query(sql, (err, result) => {
