const axios = require("axios");
const cheerio = require("cheerio");
const Sentiment = require("sentiment");
const KamusSentimen = require ("../Assets/Kamus/KamusSentimen.json");
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

async function PertanianControllers(res, url) {
  try {
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

        const sentimentAnalysis = new Sentiment();
        const sentimentResult = sentimentAnalysis.analyze(description);

        const words = description.split(" ");
        let totalSentiment = 0;
        let kataKata = [];

        words.forEach(word => {
          const cleanedWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
          if (kamusPositif[cleanedWord]) {
            totalSentiment += kamusPositif[cleanedWord];
            kataKata.push({ kata: cleanedWord, skor: kamusPositif[cleanedWord] });
          } else if (kamusNegatif[cleanedWord]) {
            totalSentiment += kamusNegatif[cleanedWord];
            kataKata.push({ kata: cleanedWord, skor: kamusNegatif[cleanedWord] });
          }
        });

        // Menentukan hasil analisis apakah positif, negatif, atau netral
        let analisisSentimen = "Netral";
        if (totalSentiment > 0) {
          analisisSentimen = "Positif";
        } else if (totalSentiment < 0) {
          analisisSentimen = "Negatif";
        }
         // Simpan berita ke dalam database Berita_Solopos
         const insertQuery = `
         INSERT IGNORE INTO Berita_Solopos(imgSrc, category, title, link, description, date, author, sentiment)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           imgSrc = VALUES(imgSrc),
           category = VALUES(category),
           title = VALUES(title),
           description = VALUES(description),
           date = VALUES(date),
           author = VALUES(author),
           sentiment = VALUES(sentiment);
 
       `;
       
       db.query(
         insertQuery,
         [imgSrc, category, title, link, description, date, author, JSON.stringify(sentimentResult)],
         (err, results) => {
           if (err) {
             if (err.code === 'ER_DUP_ENTRY') {
               console.warn("Data sudah ada dalam database, diabaikan.");
             } else {
               console.error("Gagal menyimpan berita:", err);
             }
           } else {
             console.log("Berita Pertanian berhasil disimpan ke database Solopos");
           }
         }
       );
         // Simpan berita ke dalam database Berita_Pertanian
         const insertQueryBeritaPertanian = `
         INSERT IGNORE INTO Berita_Pertanian(imgSrc, category, title, link, description, date, author, sentiment)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           imgSrc = VALUES(imgSrc),
           category = VALUES(category),
           title = VALUES(title),
           description = VALUES(description),
           date = VALUES(date),
           author = VALUES(author),
           sentiment = VALUES(sentiment);
 
       `;
       
       db.query(
         insertQueryBeritaPertanian,
         [imgSrc, category, title, link, description, date, author, JSON.stringify(sentimentResult)],
         (err, results) => {
           if (err) {
             if (err.code === 'ER_DUP_ENTRY') {
               console.warn("Data sudah ada dalam database, diabaikan.");
             } else {
               console.error("Gagal menyimpan berita:", err);
             }
           } else {
             console.log("Berita Pertanian berhasil disimpan ke database Pertanian");
           }
         }
       );

       const insertQuerysentiment = `
  INSERT IGNORE INTO sentiment_solopos (imgSrc, category, title, link, description, date, author, sentiment, analisisSentimen, kataKata)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

db.query(
  insertQuerysentiment,
  [imgSrc, category, title, link, description, date, author, JSON.stringify(sentimentResult), analisisSentimen, JSON.stringify(kataKata)],
  (err, results) => {
    if (err) {
      console.error("Gagal menyimpan berita:", err);
    } else {
      if (results.affectedRows > 0) {
        console.log("Berita berhasil disimpan ke database");
      } else {
        console.warn("Data sudah ada dalam database, diabaikan.");
      }
    }
  }
);


        newsList.push({
          imgSrc,
          category,
          title,
          link,
          description,
          date,
          author,
          sentiment: sentimentResult,
          analisisSentimen: analisisSentimen,
          kataKata: kataKata, // Menambahkan kata-kata yang mengandung sentimen dan skornya
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

module.exports = PertanianControllers;
