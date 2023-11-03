const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Sentiment = require('sentiment'); // Import pustaka analisis sentimen

const app = express();
const port = 4003; // Ganti dengan port yang Anda inginkan

// Middleware untuk mengizinkan permintaan lintas domain (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Endpoint untuk melakukan scraping dan mengambil data berita
app.get('/HotNews', (req, res) => {
  const url = 'https://www.detik.com/tag/bupati-karanganyar?tag_from=karanganyar';

  axios.get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      
      // Ubah selektor untuk mencari elemen-elemen berita
      const beritaElements = $('.l_content article');

      const beritaData = [];

      // Inisialisasi pustaka analisis sentimen
      const sentiment = new Sentiment();

      beritaElements.each((index, element) => {
        const beritaLink = $(element).find('a').attr('href');
        const judul = $(element).find('h2.title').text();
        const tanggal = $(element).find('.date').text();
        const isi = $(element).find('p').text();

        // Menambahkan kode HTML untuk elemen gambar di sini
        const gambarURL = $(element).find('span.ratiobox_content img').attr('src');

        // Analisis sentimen pada deskripsi berita
        const analisisDeskripsi = sentiment.analyze(isi);

        beritaData.push({
          judul,
          tanggal,
          isi,
          beritaLink,
          gambarURL,
          sentimen: analisisDeskripsi, // Menambahkan hasil analisis sentimen ke data berita
        });
      });

      res.json(beritaData);
    })
    .catch((error) => {
      console.error('Gagal mengambil halaman web:', error);
      res.status(500).json({ error: 'Terjadi kesalahan' });
    });
});

// Mulai server backend
app.listen(port, () => {
  console.log(`Server backend is running on port ${port}`);
});
  