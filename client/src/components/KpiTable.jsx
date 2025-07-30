// src/components/KpiTable.jsx
import SearchInput from "./SearchInput";

const KpiTable = ({
  kpis,
  kpiSearchTerm,
  setKpiSearchTerm,
  statusSearchTerm,
  setStatusSearchTerm,
}) => {
  const filteredKpis = kpis.filter(
    (kpi) =>
      kpi.name.toLowerCase().includes(kpiSearchTerm.toLowerCase()) &&
      kpi.value.toLowerCase().includes(statusSearchTerm.toLowerCase())
  );

  return (
    <div className="kpis-list">
      <h3>Current KPIs</h3>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <div className="table-header">
                  KPI Name
                  <SearchInput
                    placeholder="Search by KPI Name"
                    value={kpiSearchTerm}
                    onChange={(e) => setKpiSearchTerm(e.target.value)}
                  />
                </div>
              </th>
              <th>KPI Type</th>
              <th>
                <div className="table-header">
                  Status
                  <SearchInput
                    placeholder="Search by Status"
                    value={statusSearchTerm}
                    onChange={(e) => setStatusSearchTerm(e.target.value)}
                  />
                </div>
              </th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {filteredKpis.map((kpi) => (
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
  );
};

export default KpiTable;
