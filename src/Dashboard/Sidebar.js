import React from "react";
import {
  BsSpeedometer2,
  BsHouse,
  BsNewspaper,
  BsDatabase,
  BsGraphUp,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";

import "../CSS/Dashboard.css"

const Sidebar = () => {
  return (
    <div className="bg-white sidebar p-2">
      <div>
        <i className="bi bi-bootstrap-fill me-3 fs-4 "></i>
        <span>Portal Berita<br></br> Karanganyar</span>
      </div>
      <hr className="text-drak" />
      <div className="list-group list-group-flush">
        <NavLink to="/dashboard/" className='list-group-item py-2 my-1' role="button">
          <BsSpeedometer2 className='fs-4 me-3' />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="berita" className='list-group-item py-2 my-1' role="button">
          <BsNewspaper className='fs-5 me-3' />
          <span>Berita</span>
        </NavLink>
        <NavLink to="sumber" className='list-group-item py-2 my-1' role="button">
          <BsDatabase className='fs-5 me-3' />
          <span>Sumber</span>
        </NavLink>
        <NavLink to="analisis" className='list-group-item py-2 my-1' role="button">
          <BsGraphUp className='fs-5 me-3' />
          <span>Hasil Analisis</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
