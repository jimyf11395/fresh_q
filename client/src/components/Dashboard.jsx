import React, { useState, useEffect } from "react";
import axios from "axios";

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
      const response = await axios.get("http://localhost:5002/api/kpis");
      setKpis(response.data);
    } catch (error) {
      console.error("Error fetching kpis:", error);
      setError("Failed to load kpis");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* KPIs */}
      <div className="kpis">
        {kpis.map((kpi) => (
          <div className="kpi" key={kpi._id}>
            <h1>{kpi.value}</h1>
            <p>{kpi.name}</p>
          </div>
        ))}
        <div className="kpi">
          <h1>2,000</h1>
          <p>Lots Inspected</p>
        </div>
        <div className="kpi">
          <h1>3,500</h1>
          <p>Samples</p>
        </div>
        <div className="kpi">
          <h1>2.50</h1>
          <p>Avg. Condition Score</p>
        </div>
        <div className="kpi">
          <h1>2.20</h1>
          <p>Avg Quality Score</p>
        </div>
      </div>

      {/* Summary table */}
      <div className="kpis-list">
        <h3>Current KPIs</h3>

        {error && <div className="error-message">{error}</div>}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="table-header">
                    KPI Name
                    <input
                      type="text"
                      placeholder="Search by KPI Name"
                      value={kpiSearchTerm}
                      onChange={(e) => setKpiSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </th>
                <th>Inspection Type</th>
                <th>
                  <div className="table-header">
                    Status
                    <input
                      type="text"
                      placeholder="Search by Status"
                      value={statusSearchTerm}
                      onChange={(e) => setStatusSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </th>
                <th>Inspector</th>
              </tr>
            </thead>
            <tbody>
              {kpis
                .filter(
                  (kpi) =>
                    kpi.name
                      .toLowerCase()
                      .includes(kpiSearchTerm.toLowerCase()) &&
                    kpi.value
                      .toLowerCase()
                      .includes(statusSearchTerm.toLowerCase())
                )
                .map((kpi) => (
                  <tr key={kpi._id}>
                    <td>{kpi.name}</td>
                    <td>{kpi.value}</td>
                    <td>{kpi.status}</td>
                    <td>{kpi.kpiName}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
