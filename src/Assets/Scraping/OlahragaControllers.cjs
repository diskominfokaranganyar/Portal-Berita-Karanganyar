const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 4005; // Ganti dengan port yang Anda inginkan

// Middleware untuk mengizinkan permintaan lintas domain (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Fungsi untuk melakukan scraping berita dari URL tertentu
const scrapeBerita = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Ubah selektor untuk mencari elemen-elemen berita
    const beritaElements = $('.box-list-news'); // Sesuaikan dengan struktur HTML yang sesuai

    const beritaData = [];

    beritaElements.each((index, element) => {
      const beritaLink = $(element).find('a').attr('href');
      const judul = $(element).find('.title h2').text();
      const tanggal = $(element).find('.time').text();
      const isi = $(element).find('.desk').text();
      const gambarURL = $(element).find('.list-img img').attr('data-original');

      beritaData.push({
        judul,
        tanggal,
        isi,
        beritaLink,
        gambarURL,
      });
    });

    return beritaData;
  } catch (error) {
    console.error('Gagal mengambil halaman web:', error);
    throw error;
  }
};

// Endpoint untuk melakukan scraping dan mengambil data berita dengan paginasi
app.get('/Sport', async (req, res) => {
  try {
    const page = req.query.page || 1; // Mengambil parameter 'page' dari permintaan, default ke halaman 1
    const perPage = 10; // Jumlah berita per halaman

    // Menghitung indeks awal dan akhir untuk mengambil berita berdasarkan halaman
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    const url = 'https://karanganyar.inews.id/indeks/olahraga/all'; // URL "Berita Lainnya"

    const beritaData = await scrapeBerita(url);

    // Mengambil berita berdasarkan halaman yang dipilih
    const beritaPerPage = beritaData.slice(startIndex, endIndex);

    res.json(beritaPerPage);
  } catch (error) {
    console.error('Gagal mengambil data berita:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
});

// Endpoint untuk mengambil berita selanjutnya dari "Berita Lainnya"
app.get('/Sport/More', async (req, res) => {
  try {
    const url = 'https://karanganyar.inews.id/indeks/olahraga/all/24'; // URL "Berita Lainnya"

    const beritaData = await scrapeBerita(url);

    res.json(beritaData);
  } catch (error) {
    console.error('Gagal mengambil data berita selanjutnya:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
});

// Mulai server backend
app.listen(port, () => {
  console.log(`Server backend is running on port ${port}`);
});
