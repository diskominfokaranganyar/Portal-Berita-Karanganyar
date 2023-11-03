import React from 'react';
import { BrowserRouter as Router, Route, Routes,Outlet } from 'react-router-dom';
import Logo from './Components/Logo';
import Home from './Components/Home';
import Navigation from './Components/Navigasi';
import Topbar from './Components/Topbar';
import Pendidikan from './Pages/Pendidikan';
import Pemerintahan from './Pages/Pemerintahan';
import Pertanian from './Pages/Pertanian';
import Olahraga from './Pages/Olahraga';
import Footer from './Components/Footer';
import Copyright from './Components/COPYRIGHT';
import Pariwisata from './Pages/Pariwisata';
import Dashboard from './Components/Dashboard';

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
        <Route path="/Dashboard" element={<Dashboard/>} />
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

export default App;
