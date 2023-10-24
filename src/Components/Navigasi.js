import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom'; // Import NavLink
import "../CSS/Font.css"

function NavDropdownExample() {
  return (
    <Nav variant="pills" activeKey="1" className="center-nav">
      <Nav.Item>
        <NavLink to="/" className="nav-link" activeClassName="active">
          Home
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/pendidikan" className="nav-link" activeClassName="active">
          Pendidikan
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/pemerintahan" className="nav-link" activeClassName="active">
          Pemerintahan
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/olahraga" className="nav-link" activeClassName="active">
          Olahraga
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/pertanian" className="nav-link" activeClassName="active">
          Pertanian
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/pariwisata" className="nav-link" activeClassName="active">
          Pariwisata
        </NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default NavDropdownExample;
