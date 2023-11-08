const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const Sentiment = require("sentiment");

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

// Endpoint untuk mengambil dan menyimpan berita
app.get("/List", async (req, res) => {
  try {
    const url = "https://soloraya.solopos.com/karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai

    // Scraping berita
    const response = await axios.get(url);
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const newsList = [];

      $(".item").each((index, element) => {
        const imgSrc = $(element).find(".img img").attr("src");
        const category = $(element).find(".news-cat").text();
        const title = $(element).find(".title a").text();
        const link = $(element).find(".title a").attr("href");
        const description = $(element).find(".text").text();
        const date = $(element).find(".date").text().trim();
        const author = $(element).find(".author").text().trim();

        // Analisis sentimen pada deskripsi berita
        const sentimentAnalysis = new Sentiment();
        const sentimentResult = sentimentAnalysis.analyze(description);

        newsList.push({
          imgSrc,
          category,
          title,
          link,
          description,
          date,
          author,
          sentiment: sentimentResult,
        });
      });

      if (newsList && newsList.length > 0) {
        // Loop melalui daftar berita dan sisipkan masing-masing berita ke dalam tabel 'berita'
        for (const news of newsList) {
          const { imgSrc, category, title, link, description, date, author, sentiment } = news;

          // Contoh perintah SQL INSERT
          const insertQuery = `
            INSERT INTO berita (imgSrc, category, title, link, description, date, author, sentiment)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;

          // Menjalankan perintah SQL INSERT
          db.query(
            insertQuery,
            [imgSrc, category, title, link, description, date, author, JSON.stringify(sentiment)],
            (err, results) => {
              if (err) {
                console.error("Gagal menyimpan berita:", err);
              } else {
                console.log("Berita berhasil disimpan ke database");
              }
            }
          );
        }

        res.json({ message: "Berita berhasil diambil dan disimpan ke database" });
      } else {
        res.json({ message: "Tidak ada berita baru untuk disimpan" });
      }
    } else {
      res.status(500).json({ error: "Gagal melakukan GET request" });
    }
  } catch (error) {
    console.error("Gagal mengambil dan menyimpan berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});

// Endpoint untuk mengambil data berita yang tersimpan
app.get("/api/list", (req, res) => {
  // Buat query SQL untuk mengambil data dari tabel 'berita'
  const selectQuery = `
    SELECT imgSrc, category, title, link, description, date, author, sentiment
    FROM berita
  `;

  // Jalankan query dan kirimkan hasilnya sebagai respons JSON
  db.query(selectQuery, (err, results) => {
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
