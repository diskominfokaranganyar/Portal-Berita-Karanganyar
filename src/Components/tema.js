import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const TemaChart = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePemerintahan = await axios.get('http://localhost:5003/api/beritaPemerintahan');
        const responsePendidikan = await axios.get('http://localhost:5003/api/beritaPendidikan');
        const responsePariwisata = await axios.get('http://localhost:5003/api/beritaPariwisata');
        const responseOlahraga = await axios.get('http://localhost:5003/api/beritaOlahraga');
        const responsePertanian = await axios.get('http://localhost:5003/api/beritaPertanian');
        const responseBeritaLainnya = await axios.get('http://localhost:5003/api/beritalainnya');

        const categories = [
          "Pemerintahan",
          "Pendidikan",
          "Pariwisata",
          "Olahraga",
          "Pertanian",
          "Berita Lainnya",
        ];

        const data = [
          responsePemerintahan.data.count,
          responsePendidikan.data.count,
          responsePariwisata.data.count,
          responseOlahraga.data.count,
          responsePertanian.data.count,
          responseBeritaLainnya.data.count,
        ];

        const chartData = {
          categories,
          series: [{ name: 'Jumlah', data }],
        };

        setChartData(chartData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: chartData.categories || [],
    },
  };

  const series = isLoading ? [] : chartData.series || [];

  return (
    <div className="chart-container">
      {isLoading ? (
        <p>Loading chart...</p>
      ) : (
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      )}
    </div>
  );
};

export default TemaChart;
