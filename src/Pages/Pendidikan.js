import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Font.css";

function Pendidikan() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/Pendidikan") // Ganti URL dengan URL server backend Anda
      .then((response) => {
        setBerita(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data berita:", error);
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
                        item.sentiment.score
                      )}`}
                    >
                      {getSentimentExplanation(item.sentiment.score)}
                    </button>
                  </p>
                  <a href={item.link} style={{ textDecoration: "none" }}> {/* Menghapus garis bawah */}
                    <h2
                      className="card-title"
                      style={{ color: "black", transition: "color 0.3s", textAlign:"justify", fontSize:"30px" }}
                      onMouseOver={(e) => (e.target.style.color = "blue")}
                      onMouseOut={(e) => (e.target.style.color = "black")}
                    >
                      {item.title}
                    </h2>
                  </a>
                  <p style={{textAlign:"justify", fontSize:"20px"}}>{item.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Tanggal: {item.date} |
                      Penulis: {item.author}
                    </small>
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

export default Pendidikan;
