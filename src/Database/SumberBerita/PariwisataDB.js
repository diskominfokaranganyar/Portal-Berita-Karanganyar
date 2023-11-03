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
const url = 'https://www.solopos.com/tag/pariwisata-karanganyar'; // Ganti dengan URL sumber berita Anda

// Ambil data dari URL dengan axios
axios.get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Ubah selektor untuk mencari elemen-elemen berita
    const beritaElements = $('.item');

    // Loop melalui elemen-elemen berita
    beritaElements.each((index, element) => {
      const title = $(element).find('.title a').text();
      const link = $(element).find('.title a').attr('href');

     // Masukkan data berita ke dalam database MySQL
     const insertQuery = 'INSERT INTO sumber_berita (title, url_sumber) VALUES (?, ?)';
     db.query(insertQuery, [title, link], (err, results) => {
       if (err) {
         console.error('Gagal memasukkan data ke database:', err);
       }
     });
   });
 })
 .catch((error) => {
   console.error('Gagal mengambil halaman web:', error);
 });
