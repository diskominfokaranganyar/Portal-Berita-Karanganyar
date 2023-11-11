import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialChart = () => {
  const options = {
    chart: {
      type: 'radialBar',
    },
  };

  const series = [70];

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default RadialChart;
