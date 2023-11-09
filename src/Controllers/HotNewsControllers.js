const axios = require("axios");
const cheerio = require("cheerio");
const Sentiment = require("sentiment");
const KamusSentimen = require("../Assets/Kamus/KamusSentimen.json");
const mysql = require("mysql2");

const kamusPositif = KamusSentimen.Positif;
const kamusNegatif = KamusSentimen.Negatif;

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

async function HotNewsControllers(res, url) {
  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const newsList = [];

      $(".l_content article").each((index, element) => {
        const beritaLink = $(element).find("a").attr("href");
        const judul = $(element).find("h2.title").text();
        const tanggal = $(element).find(".date").text();
        const isi = $(element).find("p").text();
        const gambarURL = $(element)
          .find("span.ratiobox_content img")
          .attr("src");

        const sentimentAnalysis = new Sentiment();
        const sentimentResult = sentimentAnalysis.analyze(isi);

        const words = isi.split(" ");
        let totalSentiment = 0;
        let kataKata = [];

        words.forEach((word) => {
          const cleanedWord = word
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
          if (kamusPositif[cleanedWord]) {
            totalSentiment += kamusPositif[cleanedWord];
            kataKata.push({ kata: cleanedWord, skor: kamusPositif[cleanedWord] });
          } else if (kamusNegatif[cleanedWord]) {
            totalSentiment += kamusNegatif[cleanedWord];
            kataKata.push({ kata: cleanedWord, skor: kamusNegatif[cleanedWord] });
          }
        });

        // Tentukan hasil analisis sentimen (positif, negatif, atau netral)
        let analisisSentimen = "Netral";
        if (totalSentiment > 0) {
          analisisSentimen = "Positif";
        } else if (totalSentiment < 0) {
          analisisSentimen = "Negatif";
        }

        // Simpan berita ke dalam database
        const insertQuery = `
          INSERT INTO berita_detik (judul, tanggal, isi, beritaLink, gambarURL, sentiment)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
          insertQuery,
          [judul, tanggal, isi, beritaLink, gambarURL, JSON.stringify(sentimentResult)],
          (err, results) => {
            if (err) {
              console.error("Gagal menyimpan berita:", err);
            } else {
              console.log("Berita berhasil disimpan ke database");
            }
          }
        );

        newsList.push({
          judul,
          tanggal,
          isi,
          beritaLink,
          gambarURL,
          sentiment: sentimentResult,
          analisisSentimen: analisisSentimen,
          kataKata: kataKata, // Tambahkan kata-kata dengan sentimen dan skor
        });
      });

      // Kirim newsList sebagai respons JSON
      res.json(newsList);
    } else {
      res.status(500).json({ error: "Gagal melakukan GET request" });
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
}

module.exports = HotNewsControllers;
