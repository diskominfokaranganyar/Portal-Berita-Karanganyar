const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());

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

// Endpoint untuk mendapatkan jumlah data dari tabel Berita_pemerintahan
app.get('/api/beritaPemerintahan', async (req, res) => {
  try {
    const countQuery = 'SELECT COUNT(*) AS count FROM Berita_pemerintahan';
    
    db.query(countQuery, (err, results) => {
      if (err) {
        console.error('Terjadi kesalahan:', err);
        res.status(500).json({ error: 'Terjadi kesalahan' });
        return;
      }

      const count = results[0].count;
      res.json({ title: 'Berita Pemerintahan', count });
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
});
// Endpoint untuk mendapatkan jumlah data dari tabel Berita_Pendidikan
app.get('/api/beritaPendidikan', async (req, res) => {
  try {
    const countQuery = 'SELECT COUNT(*) AS count FROM Berita_Pendidikan';
    
    db.query(countQuery, (err, results) => {
      if (err) {
        console.error('Terjadi kesalahan:', err);
        res.status(500).json({ error: 'Terjadi kesalahan' });
        return;
      }

      const count = results[0].count;
      res.json({ title: 'Berita Pendidikan', count });
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
});
// Endpoint untuk mendapatkan jumlah data dari tabel Berita_Pariwisata
app.get('/api/beritaPariwisata', async (req, res) => {
  try {
    const countQuery = 'SELECT COUNT(*) AS count FROM Berita_Pariwisata';
    
    db.query(countQuery, (err, results) => {
      if (err) {
        console.error('Terjadi kesalahan:', err);
        res.status(500).json({ error: 'Terjadi kesalahan' });
        return;
      }

      const count = results[0].count;
      res.json({ title: 'Berita Pariwisata', count });
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
});
// Endpoint untuk mendapatkan jumlah data dari tabel Berita_Olahraga
app.get('/api/beritaOlahraga', async (req, res) => {
  try {
    const countQuery = 'SELECT COUNT(*) AS count FROM Berita_Olahraga';
    
    db.query(countQuery, (err, results) => {
      if (err) {
        console.error('Terjadi kesalahan:', err);
        res.status(500).json({ error: 'Terjadi kesalahan' });
        return;
      }

      const count = results[0].count;
      res.json({ title: 'Berita Olahraga', count });
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
});
// Endpoint untuk mendapatkan jumlah data dari tabel Berita_Pertanian
app.get('/api/beritaPertanian', async (req, res) => {
  try {
    const countQuery = 'SELECT COUNT(*) AS count FROM Berita_Pertanian';
    
    db.query(countQuery, (err, results) => {
      if (err) {
        console.error('Terjadi kesalahan:', err);
        res.status(500).json({ error: 'Terjadi kesalahan' });
        return;
      }

      const count = results[0].count;
      res.json({ title: 'Berita Pertanian', count });
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
});
// Endpoint untuk mendapatkan jumlah data dari tabel Berita_Lainnya
app.get('/api/beritaLainnya', async (req, res) => {
  try {
    const countQuery = 'SELECT COUNT(*) AS count FROM Berita_lainnya';
    
    db.query(countQuery, (err, results) => {
      if (err) {
        console.error('Terjadi kesalahan:', err);
        res.status(500).json({ error: 'Terjadi kesalahan' });
        return;
      }

      const count = results[0].count;
      res.json({ title: 'Berita Lainnya', count });
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
});

const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
