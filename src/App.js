import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logo from "./Components/Brand";
import Home from "./Components/Home";
import Navigation from "./Components/Navigasi";
import Topbar from "./Components/Toopbar";
import Pendidikan from "./Pages/Pendidikan";
import Pemerintahan from "./Pages/Pemerintahan";
import Pertanian from "./Pages/Pertanian";
import Olahraga from "./Pages/Olahraga";
import Footer from "./Components/Footer";
import Copyright from "./Components/COPYRIGHT";
import Pariwisata from "./Pages/Pariwisata";

function App() {
  return (
    <Router>
      <div className="Home">
        <Topbar />
        <Logo />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pendidikan" element={<Pendidikan />} />
          <Route path="/Pemerintahan" element={<Pemerintahan />} />
          <Route path="/Olahraga" element={<Olahraga />} />
          <Route path="/Pertanian" element={<Pertanian />} />
          <Route path="/Pariwisata" element={<Pariwisata/>} />
        </Routes>
        <Footer/>
        <Copyright/>
      </div>
    </Router>
  );
}

export default App;
