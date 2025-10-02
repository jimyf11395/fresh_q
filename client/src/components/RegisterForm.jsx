import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/register`,
        { email, password }
      );
      alert("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-page">
      {/* Hero / Logo */}
      <div className="register-hero">
        <img
          src="/plantly.png"
          alt="Plantly BI Logo"
          className="register-logo"
        />
        <h1 className="register-brand">Plantly BI</h1>
      </div>

      {/* Card */}
      <div className="register-card">
        <h2 className="form-title">Register</h2>
        <p className="form-subtitle">Create your account.</p>
        <form onSubmit={handleRegister}>
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="register-btn" type="submit">
            Register
          </button>
        </form>

        <div className="register-links">
          <span>Already have an account?</span>
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
