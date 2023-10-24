// src/Berita.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../CSS/Font.css";

function HotNews() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    // Membuat permintaan Axios ke server backend Anda
    axios.get('http://localhost:4000/HotNews') // Ganti dengan URL server backend Anda
      .then((response) => {
        setBerita(response.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data berita:', error);
      });
  }, []);

  // Fungsi untuk mendapatkan kelas warna berdasarkan sentimen
  const getSentimentColorClass = (score) => {
    if (score > 0) {
      return "btn-success"; // Hijau untuk sentimen positif
    } else if (score < 0) {
      return "btn-danger"; // Merah untuk sentimen negatif
    } else {
      return "btn-secondary"; // Abu-abu untuk sentimen netral
    }
  };

  // Fungsi untuk mendapatkan penjelasan sentimen
  const getSentimentExplanation = (score) => {
    if (score > 0) {
      return "Positif"; // Penjelasan untuk sentimen positif
    } else if (score < 0) {
      return "Negatif"; // Penjelasan untuk sentimen negatif
    } else {
      return "Netral"; // Penjelasan untuk sentimen netral
    }
  };

  return (
    <div className="container mt-5">
      {berita.map((item, index) => (
        <div key={index} className="Hot-item card mb-1">
          <img
            src={item.gambarURL}
            alt={item.judul}
            className="card-img-top Hot-item-image"
          />
          <div className="card-body">
            <p className="card-text">
              <button
                className={`btn ${getSentimentColorClass(
                  item.sentiment?.score || 0
                )}`}
              >
                {getSentimentExplanation(item.sentiment?.score || 0)}
              </button>
            </p>
            <a href={item.beritaLink} style={{ textDecoration: "none" }}>
              <h2
                className="card-title"
                style={{
                  color: "black",
                  transition: "color 0.3s",
                  fontSize: "18px",
                  textAlign: "justify"
                }}
                onMouseOver={(e) => (e.target.style.color = "blue")}
                onMouseOut={(e) => (e.target.style.color = "black")}
              >
                {item.judul}
              </h2>
            </a>
            <p
              style={{
                textAlign: "justify",
                fontSize: "12px",
              }}
            >
              {item.isi}
            </p>
            <small className="text-muted">{item.tanggal}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HotNews;
