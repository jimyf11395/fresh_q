import { useParams, useNavigate } from "react-router-dom";

const KpiDetail = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  // Example of loading KPI data from API later
  // For now we just show the title
  return (
    <div className="kpi-detail">
      <button onClick={() => navigate(-1)} className="btn btn-back">
        ← Back
      </button>

      <h2>{decodeURIComponent(title)}</h2>
      <p>
        Here you can display detailed metrics, charts, or trends for this KPI.
      </p>

      {/* Example section placeholders */}
      <div className="kpi-detail-section">
        <h3>Current Value</h3>
        <p>95.4%</p>
      </div>

      <div className="kpi-detail-section">
        <h3>Trend Analysis</h3>
        <p>Performance has improved by 4.2% this month.</p>
      </div>
    </div>
  );
};

export default KpiDetail;
