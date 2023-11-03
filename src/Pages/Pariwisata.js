import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Font.css";

function Pariwisata() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/Pariwisata") // Ganti URL dengan URL server backend Anda
      .then((response) => {
        setBerita(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data berita:", error);
      });
  }, []);

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
          {berita.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="card mb-4">
                <img
                  src={item.imgSrc}
                  alt={item.title}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pariwisata;
