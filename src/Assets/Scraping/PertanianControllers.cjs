const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Sentiment = require('sentiment');

const app = express();
const port = 4007;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/Pertanian', async (req, res) => {
  const url = 'https://www.solopos.com/tag/pertanian-karanganyar';

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const breakingNewsItems = $('.sp-list-breaking .item');

    const beritaData = [];

    breakingNewsItems.each((index, element) => {
      const imgSrc = $(element).find('.img img').attr('src');
      const category = $(element).find('.news-cat').text();
      const title = $(element).find('.title a').text();
      const link = $(element).find('.title a').attr('href');
      const description = $(element).find('.text').text();
      const date = $(element).find('.date ').text();
      const author = $(element).find('.author').text();

      // Analisis sentimen pada deskripsi berita
      const sentimentAnalysis = new Sentiment();
      const sentimentResult = sentimentAnalysis.analyze(description);

      // Simpan data berita dalam objek dengan analisis sentimen
      const berita = {
        imgSrc,
        category,
        title,
        link,
        description,
        date,
        author,
        sentiment: sentimentResult,
      };

      beritaData.push(berita);
    });

    res.json(beritaData);
  } catch (error) {
    console.error('Gagal mengambil halaman web:', error);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
});

app.listen(port, () => {
  console.log(`Server backend is running on port ${port}`);
});