// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Perlu ditambahkan untuk mengatasi masalah CORS
const app = express();

app.use(cors()); // Menggunakan middleware CORS

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'portalberita',
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ' + err.message);
  } else {
    console.log('Terhubung ke database');
  }
});

app.get('/api/sentimentData', async (req, res) => {
  try {
    const query = 'SELECT date, sentiment FROM berita_solopos';

    db.query(query, (err, results) => {
      if (err) {
        console.error('Terjadi kesalahan:', err);
        res.status(500).json({ error: 'Terjadi kesalahan' });
        return;
      }

      const sentimentData = results.map((row) => {
        const sentiment = JSON.parse(row.sentiment);
        const resultLabel = sentiment.score > 0 ? 'Positif' : 'Negatif';
        return {
          date: row.date,
          score: sentiment.score,
          result: resultLabel,
        };
      });

      // Mengelompokkan hasil analisis berdasarkan skor dan menghitung jumlahnya
      const groupedData = {};
      sentimentData.forEach((item) => {
        const key = `${item.result} (Skor ${item.score})`;
        if (groupedData[key]) {
          groupedData[key].count++;
        } else {
          groupedData[key] = { count: 1, score: item.score };
        }
      });

      // Menyusun data untuk ditampilkan di frontend
      const dataToShow = {
        categories: Object.keys(groupedData),
        values: Object.values(groupedData).map((item) => item.count),
        scores: Object.values(groupedData).map((item) => item.score),
      };

      res.json(dataToShow);
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
