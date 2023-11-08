import React, { Component } from "react";

class BeritaDB extends Component {
    constructor() {
      super();
      this.state = {
        newsList: [],
      };
    }
  
    componentDidMount() {
      // Ambil daftar berita dari endpoint
      fetch("http://localhost:5001/api/list")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ newsList: data });
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    }
  
    render() {
      return (
        <div className="App">
          <h1>Daftar Berita</h1>
          <ul>
            {Array.isArray(this.state.newsList) ? (
              this.state.newsList.map((news, index) => (
                <li key={index}>
                  <img src={news.imgSrc} alt="Gambar" />
                  <h2>{news.title}</h2>
                  <p>Kategori: {news.category}</p>
                  <p>{news.description}</p>
                  <p>Tanggal: {news.date}</p>
                  <p>Penulis: {news.author}</p>
                  <p>Sentimen: {news.sentiment.score}</p>
                </li>
              ))
            ) : (
              <p>Belum ada berita yang tersedia.</p>
            )}
          </ul>
        </div>
      );
    }
  }
  
export default BeritaDB