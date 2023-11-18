import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const Baranalisis = () => {
  const [chartData, setChartData] = useState({ categories: [], data: [] });

  useEffect(() => {
    // Mengambil data dari API
    axios.get('http://localhost:5002/api/sentiment')
      .then(response => {
        const categories = response.data.map(item => item.analisisSentimen);
        const data = response.data.map(item => item.jumlah_hasil);

        setChartData({ categories, data });
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  const options = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: chartData.categories,
    },
  };

  const series = [
    {
      name: 'Jumlah',
      data: chartData.data,
    },
  ];

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default Baranalisis;
