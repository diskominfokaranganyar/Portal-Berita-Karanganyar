import React from "react";
import Sidebar from "./Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
