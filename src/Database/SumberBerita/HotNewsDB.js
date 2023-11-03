const mysql = require('mysql2');
const axios = require('axios');
const cheerio = require('cheerio');

// Konfigurasi koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost', // Ganti dengan host Anda
  user: 'root', // Ganti dengan username MySQL Anda
  password: '', // Ganti dengan password MySQL Anda
  database: 'portalberita', // Ganti dengan nama database Anda
});

// URL untuk scraping berita
const url = 'https://www.detik.com/tag/bupati-karanganyar?tag_from=karanganyar';

// Ambil data dari URL dengan axios
axios.get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Ubah selektor untuk mencari elemen-elemen berita
    const beritaElements = $('.l_content article');

    // Loop melalui elemen-elemen berita
    beritaElements.each((index, element) => {
      const beritaLink = $(element).find('a').attr('href');
      const judul = $(element).find('h2.title').text();

      // Masukkan data berita ke dalam database MySQL
      const insertQuery = 'INSERT INTO sumber_berita (title, url_sumber) VALUES (?, ?)';
      db.query(insertQuery, [judul, beritaLink], (err, results) => {
        if (err) {
          console.error('Gagal memasukkan data ke database:', err);
        }
      });
    });
  })
  .catch((error) => {
    console.error('Gagal mengambil halaman web:', error);
  });
