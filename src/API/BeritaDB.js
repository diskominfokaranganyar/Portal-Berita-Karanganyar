const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5001;

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "portalberita",
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal: " + err.message);
  } else {
    console.log("Terhubung ke database");
  }
});

app.get("/api/Berita", (req, res) => {
  const sortInterval = req.query.interval || "all"; // Default to "all" if no interval is provided
  const query = `
    SELECT id, imgSrc, category, title, link, description, date, author, sentiment
    FROM berita_solopos
    UNION
    SELECT id, gambarURL AS imgSrc, NULL AS category, judul AS title, beritaLink AS link, isi AS description, tanggal AS date, NULL AS author, sentiment
    FROM berita_detik
    ORDER BY CASE
      WHEN '${sortInterval}' = 'today' THEN date = CURRENT_DATE
      WHEN '${sortInterval}' = 'thisWeek' THEN YEARWEEK(date) = YEARWEEK(CURRENT_DATE)
      WHEN '${sortInterval}' = 'thisMonth' THEN MONTH(date) = MONTH(CURRENT_DATE) AND YEAR(date) = YEAR(CURRENT_DATE)
      WHEN '${sortInterval}' = 'last12Months' THEN date >= NOW() - INTERVAL 12 MONTH
      WHEN '${sortInterval}' = 'lastYear' THEN YEAR(date) = YEAR(CURRENT_DATE) - 1
      ELSE date
    END DESC
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
