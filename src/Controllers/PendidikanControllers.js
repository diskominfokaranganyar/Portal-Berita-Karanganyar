const axios = require("axios");
const cheerio = require("cheerio");
const Sentiment = require("sentiment");
const KamusSentimen = require ("../Assets/Kamus/KamusSentimen.json");

const kamusPositif = KamusSentimen.Positif;
const kamusNegatif = KamusSentimen.Negatif;

async function PendidikanControllers(res, url) {
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

module.exports = PendidikanControllers;
