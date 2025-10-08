import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container" ref={menuRef}>
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
            KPIs
          </Link>
          <Link
            to="/users"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Users
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
