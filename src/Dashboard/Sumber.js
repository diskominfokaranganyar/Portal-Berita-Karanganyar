import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [jumlahSolopos, setJumlahSolopos] = useState(0);
  const [jumlahDetikdetik, setJumlahDetikdetik] = useState(0);
  const [jumlahSumberLain, setJumlahSumberLain] = useState(0);
  const [berita, setBerita] = useState([]);
  const [jumlahTotalBerita, setJumlahTotalBerita] = useState(0); // Menambah state untuk jumlah total berita
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jumlah-solopos")
      .then((response) => {
        setJumlahSolopos(response.data.jumlah_solopos);
      })
      .catch((error) => {
        console.error("Error fetching Solopos data: " + error);
      });

    axios
      .get("http://localhost:5000/api/jumlah-detikdetik")
      .then((response) => {
        setJumlahDetikdetik(response.data.jumlah_detikdetik);
      })
      .catch((error) => {
        console.error("Error fetching DetikDetik data: " + error);
      });

    axios
      .get("http://localhost:5000/api/semua-berita")
      .then((response) => {
        setBerita(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Berita data: " + error);
      });

    axios
      .get("http://localhost:5000/api/semua-berita-lainnya")
      .then((response) => {
        setJumlahSumberLain(response.data.jumlah_Sumber_Lain || 0);
      })
      .catch((error) => {
        console.error("Error fetching Berita data: " + error);
      });

    axios
      .get("http://localhost:5000/api/jumlah-total-berita")
      .then((response) => {
        setJumlahTotalBerita(response.data.jumlah_total_berita);
      })
      .catch((error) => {
        console.error("Error fetching Total Berita data: " + error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = berita.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPageCount = Math.ceil(berita.length / itemsPerPage);
  const displayPageCount = 5;

  let startPage = currentPage - Math.floor(displayPageCount / 2);
  if (startPage < 1) {
    startPage = 1;
  }

  let endPage = startPage + displayPageCount - 1;
  if (endPage > totalPageCount) {
    endPage = totalPageCount;
    startPage = endPage - displayPageCount + 1;
  }

  return (
    <div className="container-fluid">
      <div className="row g-3 my-4">
        <div className="col-md-3 mx-auto">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-center align-items-center flex-column rounded text-center">
            <div>
              <p>Solopos</p>
              <h3>{jumlahSolopos}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mx-auto">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-center align-items-center flex-column rounded text-center">
            <div>
              <p>DetikDetik</p>
              <h3>{jumlahDetikdetik}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mx-auto">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-center align-items-center flex-column rounded text-center">
            <div>
              <p>Sumber lain</p>
              <h3>{jumlahSumberLain}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mx-auto">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-center align-items-center flex-column rounded text-center">
            <div>
              <p>Total Berita</p>
              <h3>{jumlahTotalBerita}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-12">
          <nav>
            <ul className="pagination">
              {Array(displayPageCount)
                .fill(0)
                .map((_, i) => {
                  const pageNumber = startPage + i;
                  return (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === pageNumber ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </nav>
          <table className="table table-bordered custom-shadow">
            <thead>
              <tr className="text-center fs-">
                <th>No</th>
                <th>Judul Berita</th>
                <th>Sumber Berita</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.link.slice(0, 30) + "......"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
