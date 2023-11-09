const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5001;

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

app.get("/api/Berita", (req, res) => {
  const query = `
    SELECT id, imgSrc, category, title, link, description, date, author, sentiment
    FROM berita_solopos
    UNION
    SELECT id, gambarURL AS imgSrc, NULL AS category, judul AS title, beritaLink AS link, isi AS description, tanggal AS date, NULL AS author, sentiment
    FROM berita_detik
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
