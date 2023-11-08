import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [jumlahSolopos, setJumlahSolopos] = useState(0);
  const [jumlahDetikdetik, setJumlahDetikdetik] = useState(0);
  const [berita, setBerita] = useState([]);
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
      <div className="row g-3 my-2">
        <div className="col-md-3 mx-auto">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-center align-items-center flex-column rounded">
            <div>
              <p>Solopos</p>
              <h3>{jumlahSolopos}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mx-auto">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-center align-items-center flex-column rounded">
            <div>
              <p>DetikDetik</p>
              <h3>{jumlahDetikdetik}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mx-auto">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-center align-items-center flex-column rounded">
            <div>
              <p>Solopos</p>
              <h3>{jumlahSolopos}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mx-auto">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-center align-items-center flex-column rounded">
            <div>
              <p>DetikDetik</p>
              <h3>{jumlahDetikdetik}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-12">
          {/* page */}
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
          {/* Tabel Berita */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Judul Berita</th>
                <th className="text-center">Sumber Berita</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.url_sumber.slice(0, 30) + "......"}</td>
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
