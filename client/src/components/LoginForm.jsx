import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      login(res.data.token, res.data.email);
      navigate("/");
    } catch (err) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      {/* Hero / Logo section */}
      <div className="login-hero">
        <img
          src="/plantly.png" // replace with your logo path
          alt="Plantly BI Logo"
          className="login-logo"
        />
        <h1 className="login-brand">Plantly BI</h1>
      </div>

      {/* Card */}
      <div className="login-card">
        <h2 className="form-title">Login</h2>
        <p className="form-subtitle">Sign in to continue.</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="user@plantinconsulting.org"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-btn" type="submit">
            Log in
          </button>
        </form>

        <div className="login-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/register">Signup !</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
