const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const HotNewsControllers = require("./src/Controllers/HotNewsControllers.js");
const ListNewsControllers = require("./src/Controllers/ListNewsControllers.js");
const PendidikanControllers = require("./src/Controllers/PendidikanControllers.js");
const PertanianControllers = require("./src/Controllers/PertanianControllers.js");
const PariwisataControllers = require("./src/Controllers/PariwisataControllers.js");
const OlahragaControllers = require("./src/Controllers/OlahragaControllers.js");


// Middleware untuk mengizinkan permintaan lintas domain (CORS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Rute untuk mendapatkan daftar berita
app.get("/HotNews", async (req, res) => {
  try {
    const url =
      "https://www.detik.com/tag/bupati-karanganyar?tag_from=karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai
    await HotNewsControllers(res, url);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});

app.get("/List", async (req, res) => {
  try {
    const url = "https://soloraya.solopos.com/karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai
    await ListNewsControllers(res, url);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});
app.get("/Pendidikan", async (req, res) => {
  try {
    const url = "https://www.solopos.com/tag/Pendidikan-karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai
    await PendidikanControllers(res, url);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});app.get("/Pertanian", async (req, res) => {
  try {
    const url = "https://www.solopos.com/tag/Pertanian-karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai
    await PertanianControllers(res, url);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});

app.get("/Pariwisata", async (req, res) => {
  try {
    const url = "https://www.solopos.com/tag/Pariwisata-karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai
    await PariwisataControllers(res, url);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});

app.get("/Sport", async (req, res) => {
  try {
    const url = "https://www.solopos.com/tag/Olahraga-karanganyar"; // Gantilah URL dengan URL situs berita yang sesuai
    await OlahragaControllers(res, url);
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
});


// Rute akar
app.get("/", (req, res) => {
  res.send("Selamat datang di server backend.");
});

app.listen(port, () => {
  console.log(`Server backend is running on port ${port}`);
});
