import React, { useState } from 'react';
import Sidebar from "../Dashboard/Sidebar";
import Navbar from "../Dashboard/Navigasi";
import { Route, Routes,Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="container-fluid bg-secondary ">
      <div className="row">
        {sidebarVisible && (
          <div className="col-2 col-md-2 bg-white vh-auto">
            <Sidebar />
          </div>
        )}
        <div className={sidebarVisible ? "col-10 col-md-10" : "col-12 col-md-12"}>
          <Navbar Toggle={toggleSidebar} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

function Layout () {
  return (
    <>
    <Sidebar/>
    <Navbar/>
    <Outlet/>
    </>
  );
}

export default Dashboard;
