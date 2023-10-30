const axios = require("axios");
const cheerio = require("cheerio");
const Sentiment = require("sentiment");
const KamusSentimen = require("../Assets/Kamus/KamusSentimen.json");

const kamusPositif = KamusSentimen.Positif;
const kamusNegatif = KamusSentimen.Negatif;

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

        // Determine sentiment analysis result (positive, negative, or neutral)
        let analisisSentimen = "Netral";
        if (totalSentiment > 0) {
          analisisSentimen = "Positif";
        } else if (totalSentiment < 0) {
          analisisSentimen = "Negatif";
        }

        newsList.push({
          judul,
          tanggal,
          isi,
          beritaLink,
          gambarURL,
          sentiment: sentimentResult,
          analisisSentimen: analisisSentimen,
          kataKata: kataKata, // Add words with sentiment and scores
        });
      });

      // Send newsList as JSON response
      res.json(newsList);
    } else {
      res.status(500).json({ error: "Failed to perform GET request" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

module.exports = HotNewsControllers;
