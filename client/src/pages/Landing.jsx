import landingImg from "../components/plantly.png";
import { useAuth } from "../context/AuthContext";
import "../index.css";

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="landing-container">
      <div className="landing-left">
        <img src={landingImg} alt="Landing Visual" className="landing-image" />
      </div>
      <div className="landing-right">
        <h1 className="landing-heading">Welcome back, {user?.first_name}!</h1>
        <input
          type="text"
          placeholder="Search..."
          className="landing-searchbar"
        />
      </div>
    </div>
  );
};

export default Landing;
