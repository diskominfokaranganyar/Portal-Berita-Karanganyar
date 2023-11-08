const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

// Konfigurasi koneksi ke database MySQL
const db = mysql.createConnection({
  host: "localhost", // Ganti dengan alamat host database Anda
  user: "root", // Ganti dengan nama pengguna database Anda
  password: "", // Ganti dengan kata sandi database Anda
  database: "portalberita", // Ganti dengan nama database Anda
});

// Terhubung ke database
db.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal: " + err.message);
  } else {
    console.log("Terhubung ke database");
  }
});

// Endpoint untuk mengambil jumlah berita Solopos
app.get("/api/jumlah-solopos", (req, res) => {
  const query = `
    SELECT COUNT(*) AS jumlah_solopos
    FROM sumber_berita
    WHERE url_sumber LIKE 'https://soloraya.solopos.com%'
    OR url_sumber LIKE 'https://news.solopos.com%'
    OR url_sumber LIKE 'https://foto.solopos.com'
    OR url_sumber LIKE 'https://sekolah.solopos.com'
    OR url_sumber LIKE 'https://kolom.solopos.com'
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database: " + err.message);
      res.status(500).json({ error: "Gagal mengambil data dari database" });
    } else {
      res.json(results[0]);
    }
  });
});

// Endpoint untuk mengambil jumlah berita DetikDetik
app.get("/api/jumlah-detikdetik", (req, res) => {
  const query = `
    SELECT COUNT(*) AS jumlah_detikdetik
    FROM sumber_berita
    WHERE url_sumber LIKE 'https://www.detik.com%' OR url_sumber LIKE 'https://news.detik.com%'
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database: " + err.message);
      res.status(500).json({ error: "Gagal mengambil data dari database" });
    } else {
      res.json(results[0]);
    }
  });
});
// Endpoint untuk mengambil semua data berita yang bukan dari Solopos atau Detik2
app.get("/api/semua-berita-lainnya", (req, res) => {
  const query = `
    SELECT id, title, url_sumber
    FROM sumber_berita
    WHERE url_sumber NOT LIKE 'https://soloraya.solopos.com%'
      AND url_sumber NOT LIKE 'https://www.detik.com%'
      AND url_sumber NOT LIKE 'https://news.detik.com%'
      AND url_sumber NOT LIKE 'https://news.solopos.com%'
      AND url_sumber NOT LIKE 'https://foto.solopos.com%'
      AND url_sumber NOT LIKE 'https://sekolah.solopos.com%'
      AND url_sumber NOT LIKE 'https://kolom.solopos.com%'
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database: " + err.message);
      res.status(500).json({ error: "Gagal mengambil data dari database" });
    } else {
      res.json(results);
    }
  });
});

// Endpoint untuk mengambil semua data berita
app.get("/api/semua-berita", (req, res) => {
  const query = `
    SELECT id, title, url_sumber
    FROM sumber_berita
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database: " + err.message);
      res.status(500).json({ error: "Gagal mengambil data dari database" });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
