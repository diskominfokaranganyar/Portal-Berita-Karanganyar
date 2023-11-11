import React from 'react';
import BarChart from '../Components/BarChart';
import LineChart from '../Components/LineChart';
import RadialChart from '../Components/RadialChart';

const BeritaDB = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  const chartContainerStyle = {
    flex: '1',
    margin: '10px',
  };

  return (
    <div className="row g-3 my-4">
      <div className="col-md-12">
        <div className="p-3 bg-white shadow-sm rounded text-center">
          <div style={containerStyle}>
            <div style={chartContainerStyle}>
              <BarChart />
            </div>
            <div style={chartContainerStyle}>
              <LineChart />
            </div>
            <div style={chartContainerStyle}>
              <RadialChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaDB;
