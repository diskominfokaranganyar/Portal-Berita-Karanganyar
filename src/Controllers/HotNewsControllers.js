const axios = require("axios");
const cheerio = require("cheerio");
const Sentiment = require("sentiment");

async function HotNewsControllers(res, url) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const beritaElements = $(".l_content article");
      const beritaData = [];

      const sentiment = new Sentiment();

      beritaElements.each((index, element) => {
        const beritaLink = $(element).find("a").attr("href");
        const judul = $(element).find("h2.title").text();
        const tanggal = $(element).find(".date").text();
        const isi = $(element).find("p").text();

        const gambarURL = $(element)
          .find("span.ratiobox_content img")
          .attr("src");

        const analisisDeskripsi = sentiment.analyze(isi);

        beritaData.push({
          judul,
          tanggal,
          isi,
          beritaLink,
          gambarURL,
          sentimen: analisisDeskripsi,
        });
      });

      if (beritaData.length > 0) {
        res.json(beritaData);
      } else {
        res.status(404).json({ error: "Tidak ada berita yang ditemukan." });
      }
    } else {
      // Tangani kesalahan jika respons bukan 200 OK
      res
        .status(response.status)
        .json({
          error:
            "Gagal mengambil data berita. Halaman tidak ditemukan atau sumber berita tidak tersedia.",
        });
    }
  } catch (error) {
    console.error("Gagal mengambil data berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan. " + error.message });
  }
}

module.exports = HotNewsControllers;
