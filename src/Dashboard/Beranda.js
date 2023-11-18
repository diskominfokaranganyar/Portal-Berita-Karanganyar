import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const NewsTable = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [sortInterval, setSortInterval] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [sortInterval]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/api/Berita?interval=${sortInterval}`);
      setNewsData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleSortChange = (selectedInterval) => {
    setCurrentPage(1);
    setSortInterval(selectedInterval);
    closeDropdown();
  };

  const sortedNews = newsData.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = sortedNews.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="table-container mt-4">
      <div className="dropdown mb-2">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="sortDropdown"
          onClick={toggleDropdown}
        >
          Urutkan Berdasarkan
        </button>
        <div
          className={`dropdown-menu${isDropdownOpen ? " show" : ""}`}
          aria-labelledby="sortDropdown"
        >
          <button
            className="dropdown-item"
            onClick={() => handleSortChange("today")}
          >
            Hari Ini
          </button>
          <button
            className="dropdown-item"
            onClick={() => handleSortChange("thisWeek")}
          >
            Minggu Ini
          </button>
          <button
            className="dropdown-item"
            onClick={() => handleSortChange("thisMonth")}
          >
            Bulan Ini
          </button>
          <button
            className="dropdown-item"
            onClick={() => handleSortChange("last12Months")}
          >
            12 Bulan Terakhir
          </button>
          <button
            className="dropdown-item"
            onClick={() => handleSortChange("lastYear")}
          >
            Tahun Lalu
          </button>
          <button
            className="dropdown-item"
            onClick={() => handleSortChange("all")}
          >
            Semua
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Mengambil data...</p>
      ) : (
        <>
          <ul className="pagination justify-content-center">
            {Array.from({
              length: Math.ceil(sortedNews.length / newsPerPage),
            }).map(
              (_, index) =>
                index >= currentPage - 2 &&
                index <= currentPage + 2 && (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
            )}
          </ul>

          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Penulis</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {currentNews.map((news, index) => (
                <tr key={index}>
                  <td>{indexOfFirstNews + index + 1}</td>
                  <td>{news.title}</td>
                  <td>{news.category}</td>
                  <td>{news.author}</td>
                  <td>{news.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default NewsTable;
