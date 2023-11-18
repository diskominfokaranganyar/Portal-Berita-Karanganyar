const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5002;

app.use(cors());

// Konfigurasi koneksi database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL Anda
  password: '', // Ganti dengan password MySQL Anda
  database: 'portalberita', // Ganti dengan nama database Anda
});

// Terhubung ke database
db.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal: ' + err.stack);
    return;
  }
  console.log('Terhubung ke database');
});

// Endpoint untuk menghitung jumlah hasil analisis sentimen dari kedua tabel
app.get('/api/sentiment', (req, res) => {
  const query = `
    SELECT analisisSentimen, COUNT(*) AS jumlah_hasil
    FROM (
      SELECT analisisSentimen FROM sentiment_solopos
      UNION ALL
      SELECT analisisSentimen FROM sentiment_detik
    ) AS combined_sentiment
    GROUP BY analisisSentimen
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error saat mengambil data dari database:', err);
      res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    } else {
      res.json(results);
    }
  });
});
app.get('/api/tabel', (req, res) => {
  const query = `
    SELECT title, analisisSentimen, kataKata
    FROM (
      SELECT title, analisisSentimen, kataKata FROM sentiment_solopos
      UNION ALL
      SELECT judul, analisisSentimen, kataKata FROM sentiment_detik
    ) AS combined_sentiment
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error saat mengambil data dari database:', err);
      res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
