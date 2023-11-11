import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const SentimentChart = () => {
  const [sentimentData, setSentimentData] = useState({
    categories: [],
    values: [],
    scores: [],
  });

  useEffect(() => {
    // Ambil data sentimen dari API
    axios.get('http://localhost:5002/api/sentimentData')
      .then((response) => {
        setSentimentData(response.data);
      })
      .catch((error) => {
        console.error('Terjadi kesalahan:', error);
      });
  }, []);

  const options = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: sentimentData.categories,
    },
  };

  const series = [
    {
      name: 'Sentiment Score',
      data: sentimentData.values,
    },
  ];

  const renderLegend = () => {
    return (
      <div className="legend">
        {sentimentData.categories.map((category, index) => (
          <div key={index} className="legend-item">
            <span className={`legend-icon ${sentimentData.scores[index] > 0 ? 'positive' : 'negative'}`}></span>
            {category}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="chart-container">
        {sentimentData.categories.length > 0 && (
          <ReactApexChart options={options} series={series} type="line" height={350} />
        )}
      </div>
      {renderLegend()}
    </div>
  );
};

export default SentimentChart;
