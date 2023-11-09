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
    FROM berita_solopos
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
    FROM berita_detik
    WHERE beritalink LIKE 'https://www.detik.com%' OR beritalink LIKE 'https://news.detik.com%'
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
      AND url_sumber NOT LIKE 'https://news.detik.com%'
      AND url_sumber NOT LIKE 'https://www.detik.com%'
      AND url_sumber NOT LIKE 'https://news.solopos.com%'
      AND url_sumber NOT LIKE 'https://foto.solopos.com%'
      AND url_sumber NOT LIKE 'https://kolom.solopos.com%'
      AND url_sumber NOT LIKE 'https://sekolah.solopos.com%'
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
    SELECT (@counter := @counter + 1) AS id, title, link
    FROM (
      SELECT title, link
      FROM berita_solopos
      UNION ALL
      SELECT judul AS title, beritaLink AS link
      FROM berita_detik
    ) AS all_berita
    CROSS JOIN (SELECT @counter := 0) AS counter_init
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

// Endpoint untuk Jumlah semua data berita
app.get("/api/jumlah-total-berita", (req, res) => {
  const query = `
    SELECT SUM(jumlah_total) AS jumlah_total_berita FROM (
      SELECT COUNT(DISTINCT link) AS jumlah_total FROM Berita_Solopos
      UNION
      SELECT COUNT(DISTINCT beritaLink) AS jumlah_total FROM berita_detik
    ) AS total`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database: " + err.message);
      res.status(500).json({ error: "Gagal mengambil data dari database" });
    } else {
      res.json(results[0]);
    }
  });
});


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
