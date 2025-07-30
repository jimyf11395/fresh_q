import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const tiles = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "KPI Manager", path: "/kpi" },
    { label: "Settings", path: "/settings" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <div className="landing-container">
      {tiles.map(({ label, path }) => (
        <div key={path} className="landing-tile" onClick={() => navigate(path)}>
          {label}
        </div>
      ))}
    </div>
  );
};

export default Landing;
