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
        { withCredentials: true } // <- This enables cookies!
      );

      login(res.data.token, res.data.email);
      navigate("/");
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        const message = data?.message?.toLowerCase() || "";

        if (status === 400) {
          alert(message || "Invalid request.");
        } else if (status === 401) {
          if (message.includes("user not found")) {
            alert("User does not exist.");
          } else if (message.includes("invalid password")) {
            alert("Incorrect password.");
          } else {
            alert("Email or password is incorrect.");
          }
        } else if (status === 404 && message.includes("user")) {
          alert("User does not exist.");
        } else {
          alert(data?.message || `Login failed with status code ${status}.`);
        }
      } else if (err.request) {
        alert(
          "Cannot connect to the server. Please check your internet connection."
        );
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-form-btn" type="submit">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginForm;
