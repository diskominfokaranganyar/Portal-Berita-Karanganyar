import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../Dashboard/Sidebar";
import Beranda from "../Dashboard/Beranda";

const Dashboard = () => {
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        {toggle && (
          <div className="col-2 col-md-2 bg-white vh-100">
            <Sidebar />
          </div>
        )}
        <div className={toggle ? "col-10 col-md-10" : "col-12 col-md-12"}>
          <Beranda Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
