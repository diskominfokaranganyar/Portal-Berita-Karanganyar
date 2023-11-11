import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = () => {
  const options = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: ["Pendidikan", "Pemerintahan", "Pertanian", "Perdagangan", "Pariwisata"],
    },
  };

  const series = [
    {
      name: 'Jumlah',
      data: [20, 1, 21, 15, 36],
    },
  ];

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
