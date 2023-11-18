// src/components/Analisis.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Pagination } from 'react-bootstrap';
import Baranalisis from '../Components/Baranalisis';
import DonutChart from '../Components/DounatCart';

const Analisis = () => {
  const [sentiments, setSentiments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:5002/api/tabel')
      .then(response => {
        setSentiments(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = sentiments.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(sentiments.length / newsPerPage);
    const pagesToShow = 5;
    const pageNumbers = [];

    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    while (startPage + pagesToShow - 1 > totalPages) {
      startPage--;
    }

    for (let i = 0; i < pagesToShow; i++) {
      if (startPage + i <= totalPages) {
        pageNumbers.push(startPage + i);
      }
    }

    return pageNumbers;
  };

  // Function to determine the CSS class for the "Kata-Kata" cell
  const getKataKataClass = (kataKata) => {
    if (kataKata.toLowerCase().includes('positif')) {
      return 'text-success'; // Green for positive
    } else if (kataKata.toLowerCase().includes('negatif')) {
      return 'text-danger'; // Red for negative
    }
    return ''; // Default class
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col xs={12} md={6}>
          <Baranalisis />
        </Col>
        <Col xs={12} md={6}>
          <DonutChart />
        </Col>
      </Row>
      <h2>Sentiment Table</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Analisis Sentimen</th>
            <th>Kata-Kata</th>
          </tr>
        </thead>
        <tbody>
          {currentNews.map((sentiment, index) => (
            <tr key={index}>
              <td>{indexOfFirstNews + index + 1}</td>
              <td>{sentiment.title}</td>
              <td>{sentiment.analisisSentimen}</td>
              <td className={getKataKataClass(sentiment.kataKata)}>
                {sentiment.kataKata}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {generatePageNumbers().map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default Analisis;
