import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Font.css";

function Pemerintahan() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    // Mengambil data berita dari server backend
    axios
      .get("http://localhost:4000/HotNews") // Ganti dengan URL server backend Anda
      .then((response) => {
        setBerita(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data berita:", error);
      });
  }, []);

  // Fungsi untuk mendapatkan kelas warna berdasarkan sentimen
  const getSentimentColorClass = (sentiment) => {
    if (sentiment === "Positif") {
      return "btn-success"; // Green for positive sentiment
    } else if (sentiment === "Negatif") {
      return "btn-danger"; // Red for negative sentiment
    } else {
      return "btn-secondary"; // Gray for neutral sentiment
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {berita.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="card mb-4">
                <img
                  src={item.gambarURL}
                  alt={item.judul}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                <p className="card-text">
                    <button
                      className={`btn ${getSentimentColorClass(
                        item.analisisSentimen
                      )}`}
                    >
                      {item.analisisSentimen}
                    </button>
                  </p>
                  <a href={item.beritaLink} style={{ textDecoration: "none" }}>
                    <h2
                      className="card-title"
                      style={{
                        textAlign: "justify",
                        fontSize: "30px",
                        color: "black",
                        transition: "color 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.color = "blue")}
                      onMouseOut={(e) => (e.target.style.color = "black")}
                    >
                      {item.judul}
                    </h2>
                  </a>
                  <p style={{ textAlign: "justify", fontSize: "20px" }}>
                    {item.isi}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">{item.tanggal}</small>
                  </p>
                  <p className="card-text">
                    <strong>Kata-kata Sentimen:</strong>{" "}
                    {item.kataKata.map((kata, idx) => (
                      <span
                        key={idx}
                        className={
                          kata.skor > 0
                            ? "text-success"
                            : kata.skor < 0
                            ? "text-danger"
                            : "text-secondary"
                        }
                      >
                        {kata.kata} ({kata.skor})
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pemerintahan;
