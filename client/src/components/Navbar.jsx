import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        {/* Burger button */}
        <button
          className="burger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <Link to="/" className="nav-brand">
          Plantly BI
        </Link>

        {/* Burger button
        <button
          className="burger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button> */}

        {/* Links */}
        <div className={`nav-links ${isOpen ? "show" : ""}`}>
          <Link
            to="/dashboard"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link to="/kpi" className="nav-link" onClick={() => setIsOpen(false)}>
            KPI Manager
          </Link>
          <Link
            to="/profile"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
