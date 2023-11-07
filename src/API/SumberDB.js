const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost', // Ganti dengan host database Anda
  user: 'root', // Ganti dengan username database Anda
  password: '', // Ganti dengan password database Anda
  database: 'portalberita', // Ganti dengan nama database Anda
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Definisikan endpoint untuk mengambil data sumber berita
app.get('/api/sumber-berita', (req, res) => {
  const sql = 'SELECT * FROM sumber_berita';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error retrieving data');
      return;
    }
    res.json(results);
  });
});

const port = process.env.PORT || 5000; // Port server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
