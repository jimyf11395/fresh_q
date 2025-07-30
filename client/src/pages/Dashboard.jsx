import { useState, useEffect } from "react";
import axios from "axios";
import KpiCard from "../components/KpiCard";
import KpiTable from "../components/KpiTable";

const Dashboard = () => {
  const [kpis, setKpis] = useState([]);
  const [error, setError] = useState("");
  const [kpiSearchTerm, setKpiSearchTerm] = useState("");
  const [statusSearchTerm, setStatusSearchTerm] = useState("");

  useEffect(() => {
    fetchKpis();
  }, []);

  const fetchKpis = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/kpis");
      setKpis(response.data);
    } catch (error) {
      console.error("Error fetching kpis:", error);
      setError("Failed to load kpis");
    }
  };

  return (
    <div>
      <h1>🚀 Dashboard</h1>

      {/* KPI Cards */}
      <div className="kpis">
        {kpis.map((kpi) => (
          <KpiCard key={kpi._id} value={kpi.value} label={kpi.name} />
        ))}
        <KpiCard value={kpis.length} label="Total KPIs" />
      </div>

      {/* KPI Table */}
      {error && <div className="error-message">{error}</div>}
      <KpiTable
        kpis={kpis}
        kpiSearchTerm={kpiSearchTerm}
        setKpiSearchTerm={setKpiSearchTerm}
        statusSearchTerm={statusSearchTerm}
        setStatusSearchTerm={setStatusSearchTerm}
      />
    </div>
  );
};

export default Dashboard;
