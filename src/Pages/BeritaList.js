import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Font.css";
// import "../CSS/BeritaList.css"; // Impor file CSS responsif

function BeritaList() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    // Mengambil data dari server scraping
    axios
      .get("http://localhost:4000/list")
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
    <div className="container mt-5">
      <ul className="list-group">
        {berita.map((item, index) => (
          <li key={index} className="list-group-item">
            <div className="row">
              <div className="col-md-3">
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-9">
              <p className="card-text">
                    <button
                      className={`btn ${getSentimentColorClass(
                        item.analisisSentimen
                      )}`}
                    >
                      {item.analisisSentimen}
                    </button>
                  </p>

                  <a href={item.link} style={{ textDecoration: "none" }}>
                    <h2
                      className="card-title"
                      style={{
                        color: "black",
                        transition: "color 0.3s",
                        textAlign: "justify",
                        fontSize: "30px",
                      }}
                      onMouseOver={(e) => (e.target.style.color = "blue")}
                      onMouseOut={(e) => (e.target.style.color = "black")}
                    >
                      {item.title}
                    </h2>
                  </a>
                  <p style={{ textAlign: "justify", fontSize: "20px" }}>
                    {item.description}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Tanggal: {item.date} | Penulis: {item.author}
                    </small>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BeritaList;
