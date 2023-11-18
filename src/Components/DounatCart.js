import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const DonutChart = () => {
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
      type: 'donut',
    },
    labels: chartData.categories,
    plotOptions: {
      pie: {
        colors: chartData.categories.map(category => {
          if (category === 'Positif') return '#008000'; // Hijau untuk nilai positif
          if (category === 'Negatif') return '#FF0000'; // Merah untuk nilai negatif
          return '#A9A9A9'; // Abu-abu untuk nilai netral
        }),
      },
    },
  };

  const series = chartData.data;

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="donut" height={350} />
    </div>
  );
};

export default DonutChart;
