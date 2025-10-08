import { useNavigate } from "react-router-dom";
import landingImg from "../components/plantly.png";
import { useAuth } from "../context/AuthContext";
import "../index.css";

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const kpis = [
    {
      title: "KPI Compliance",
      value: "95.4%",
      change: "+4.2%",
      positive: true,
    },
    {
      title: "Harvest Productivity",
      value: "3,540",
      change: "-5.0%",
      positive: false,
    },
    {
      title: "Water Usage Efficiency",
      value: "87%",
      change: "+1.8%",
      positive: true,
    },
  ];

  const handleCardClick = (kpiTitle) => {
    // encode title to make it URL-safe
    const encodedTitle = encodeURIComponent(kpiTitle);
    navigate(`/kpi/${encodedTitle}`);
  };

  return (
    <div className="dashboard">
      {/* Top Section */}
      <div className="dashboard-header">
        <img src={landingImg} alt="User Avatar" className="dashboard-avatar" />
        <h2 className="dashboard-welcome">
          Welcome back, {user?.first_name} {user?.last_name}
        </h2>
      </div>

      {/* KPI Grid */}
      <div className="dashboard-grid">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="kpi-card"
            onClick={() => handleCardClick(kpi.title)}
            style={{ cursor: "pointer" }}
          >
            <p className="kpi-title">{kpi.title}</p>
            <h3 className="kpi-value">{kpi.value}</h3>
            <span
              className={`kpi-change ${kpi.positive ? "positive" : "negative"}`}
            >
              {kpi.change}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Navbar */}
      <div className="dashboard-nav">
        <i className="fas fa-clipboard-list"></i>
        <i className="fas fa-chart-bar"></i>
        <i className="fas fa-compass"></i>
        <i className="fas fa-bell"></i>
        <i className="fas fa-cog"></i>
      </div>
    </div>
  );
};

export default Landing;
