import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">
          Plantly BI
        </Link>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/kpi" className="nav-link">
            KPI Manager
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
