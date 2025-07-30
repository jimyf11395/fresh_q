import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">
          Plantly BI
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
