import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

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
          <SignedOut>
            <SignInButton className="login-btn" />
          </SignedOut>
          <SignedIn>
            <UserButton className="login-btn" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
