import React, { useState } from "react";
import {
  BsSpeedometer2,
  BsHouse,
  BsNewspaper,
  BsDatabase,
  BsGraphUp,
} from "react-icons/bs";
import "../CSS/Dashboard.css";
import Sumber from "./Sumber";

const Sidebar = () => {
  const [showSumber, setShowSumber] = useState(false);

  const toggleSumber = () => {
    setShowSumber(!showSumber);
  };

  return (
    <div className="bg-white sidebar p-2">
      <div>
        <i className="bi bi-bootstrap-fill me-3 fs-4 "></i>
        <span>Portal Berita</span>
      </div>
      <hr className="text-drak" />
      <div className="list-group list-group-flush">
        <a className='list-group-item py-2 my-1' role="button">
          <BsSpeedometer2 className='fs-4 me-3' />
          <span>Dashboard</span>
        </a>
        <a className='list-group-item py-2 my-1' role="button">
          <BsHouse className='fs-5 me-3' />
          <span>Beranda</span>
        </a>
        <a className='list-group-item py-2 my-1' role="button">
          <BsNewspaper className='fs-5 me-3' />
          <span >Berita</span>
        </a>
        <a className='list-group-item py-2 my-1' role="button" onClick={toggleSumber}>
          <BsDatabase className='fs-5 me-3' />
          <span>Sumber</span>
        </a>
        <a className='list-group-item py-2 my-1' role="button">
          <BsGraphUp className='fs-5 me-3' />
          <span>Hasil Analisis</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
