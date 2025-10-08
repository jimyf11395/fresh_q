// src/components/KpiTable.jsx
import SearchInput from "./SearchInput";

const KpiTable = ({ kpis, kpiSearchTerm, setKpiSearchTerm }) => {
  const filteredKpis = kpis.filter((kpi) =>
    kpi.name.toLowerCase().includes(kpiSearchTerm.toLowerCase())
  );

  return (
    <div className="kpis-list">
      <h3 className="text-xl font-semibold mb-4">KPI Headers</h3>

      <div className="table-container overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="p-2 border">
                <div className="flex flex-col">
                  <span>Name</span>
                  <SearchInput
                    placeholder="Search by KPI name"
                    value={kpiSearchTerm}
                    onChange={(e) => setKpiSearchTerm(e.target.value)}
                  />
                </div>
              </th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Frequency</th>
              <th className="p-2 border">Formula</th>
              <th className="p-2 border">Owner (User ID)</th>
              <th className="p-2 border">Department ID</th>
              <th className="p-2 border">Project ID</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {filteredKpis.length > 0 ? (
              filteredKpis.map((kpi) => (
                <tr key={kpi.kpi_id} className="text-sm hover:bg-gray-50">
                  <td className="p-2 border font-medium">{kpi.name}</td>
                  <td className="p-2 border">{kpi.description || "-"}</td>
                  <td className="p-2 border">{kpi.category || "-"}</td>
                  <td className="p-2 border">{kpi.unit || "-"}</td>
                  <td className="p-2 border">{kpi.frequency || "-"}</td>
                  <td className="p-2 border text-xs">{kpi.formula || "-"}</td>
                  <td className="p-2 border text-center">
                    {kpi.owner_user_id || "-"}
                  </td>
                  <td className="p-2 border text-center">
                    {kpi.department_id || "-"}
                  </td>
                  <td className="p-2 border text-center">
                    {kpi.project_id || "-"}
                  </td>
                  <td className="p-2 border text-xs">
                    {new Date(kpi.created_at).toLocaleString()}
                  </td>
                  <td className="p-2 border text-xs">
                    {new Date(kpi.updated_at).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center p-4 text-gray-500">
                  No KPIs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KpiTable;
