import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">
          FreshQ
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Quality Inspections</Link>
          <Link to="/create" className="nav-link">New Inspection</Link>
          <Link to="/inspectors" className="nav-link">Inspectors</Link>
          <Link to="/locations" className="nav-link">Locations</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
