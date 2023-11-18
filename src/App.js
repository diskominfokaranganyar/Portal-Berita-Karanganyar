import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Logo from "./Components/Logo";
import Home from "./Components/Home";
import Navigation from "./Components/Navigasi";
import Topbar from "./Components/Topbar";
import Pendidikan from "./Pages/Pendidikan";
import Pemerintahan from "./Pages/Pemerintahan";
import Pertanian from "./Pages/Pertanian";
import Olahraga from "./Pages/Olahraga";
import Footer from "./Components/Footer";
import Copyright from "./Components/COPYRIGHT";
import Pariwisata from "./Pages/Pariwisata";
import Beranda from "./Dashboard/Beranda";
import Sidebar from "./Dashboard/Sidebar";
import Navbar from "./Dashboard/Navigasi";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sumber from "./Dashboard/Sumber";
import BeritaDB from "./Dashboard/BeritaDB";
import Analisis from "./Dashboard/Analisis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Pendidikan" element={<Pendidikan />} />
          <Route path="/Pemerintahan" element={<Pemerintahan />} />
          <Route path="/Olahraga" element={<Olahraga />} />
          <Route path="/Pertanian" element={<Pertanian />} />
          <Route path="/Pariwisata" element={<Pariwisata />} />
        </Route>
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<Beranda />}/>
            <Route path="beranda" element={<Beranda />} />
            <Route path="berita" element={<BeritaDB />} />
            <Route path="sumber" element={<Sumber />} />
            <Route path="analisis" element={<Analisis />} />
          </Route>
      </Routes>
    </Router>
  );
}

function Layout() {
  return (
    <>
      <Topbar />
      <Logo />
      <Navigation />
      <Outlet />
      <Footer />
      <Copyright />
    </>
  );
}

function DashboardLayout() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="container-fluid bg-white min-vh-100">
      <div className="row">
        {sidebarVisible && (
          <div className="col-2 col-md-2 bg-white vh-100">
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
}

export default App;
