const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const Sentiment = require("sentiment");

const app = express();
const port = 4001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/list", async (req, res) => {
  try {
    const url = "https://soloraya.solopos.com/karanganyar"; // Ganti dengan URL sumber berita Anda

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
        const author = $(element).find(".author").text().trim(); // Mengambil teks author dan menghapus spasi di awal dan akhir

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

      res.json(newsList);
    } else {
      res.status(500).json({ error: "Gagal melakukan GET request" });
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
