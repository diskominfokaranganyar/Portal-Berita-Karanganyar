import React from 'react';

const Navbar = ({ Toggle }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-white bg-white  px-3">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavID" aria-controls="collapsibleNavID" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavID">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="DropdownId" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Layanan
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="DropdownId">
              <li><a className="dropdown-item" href="#">Layanan 1</a></li>
              <li><a className="dropdown-item" href="#">Layanan 2</a></li>
              <li><a className="dropdown-item" href="#">Layanan 3</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
