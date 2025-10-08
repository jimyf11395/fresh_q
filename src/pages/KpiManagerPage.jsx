import { useState, useEffect } from "react";
import axios from "axios";
import KpiModal from "../components/KpiModal";

const KpiManager = () => {
  const [kpis, setKpis] = useState([]);
  const [newKpi, setNewKpi] = useState({
    name: "",
    description: "",
    category: "",
    unit: "",
    frequency: "",
    formula: "",
    owner_user_id: "",
    department_id: "",
    project_id: "",
  });
  const [editingKpi, setEditingKpi] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setEditingKpi(null);
    setNewKpi({
      name: "",
      description: "",
      category: "",
      unit: "",
      frequency: "",
      formula: "",
      owner_user_id: "",
      department_id: "",
      project_id: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (kpi) => {
    setEditingKpi(kpi);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingKpi(null);
  };

  useEffect(() => {
    fetchKpis();
  }, []);

  const fetchKpis = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/kpis`
      );
      const sortedKpis = response.data.sort((a, b) => a.kpi_id - b.kpi_id);
      setKpis(sortedKpis);
    } catch (error) {
      console.error("Error fetching KPIs:", error);
      setError("Failed to load KPIs");
    }
  };

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingKpi((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewKpi((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingKpi) {
        // Update existing KPI
        await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}/api/kpis/${editingKpi.kpi_id}`,
          editingKpi
        );
      } else {
        // Create new KPI
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/kpis`,
          newKpi
        );
      }
      setError("");
      closeModal();
      fetchKpis();
    } catch (error) {
      console.error("Error saving KPI:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to save KPI";
      setError(errorMessage);
    }
  };

  // 🧹 NEW: Handle delete KPI
  const handleDelete = async (kpi_id) => {
    if (!window.confirm("Are you sure you want to delete this KPI?")) return;
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/kpis/${kpi_id}`
      );
      fetchKpis(); // refresh list
    } catch (error) {
      console.error("Error deleting KPI:", error);
      setError("Failed to delete KPI");
    }
  };

  return (
    <div className="kpi-manager">
      <h2>Manage KPIs</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Frequency</th>
              <th>Owner</th>
              <th>Department</th>
              <th>Project</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {kpis.map((kpi) => (
              <tr key={kpi.kpi_id}>
                <td>{kpi.kpi_id}</td>
                <td>{kpi.name}</td>
                <td>{kpi.category}</td>
                <td>{kpi.unit}</td>
                <td>{kpi.frequency}</td>
                <td>{kpi.owner_user_id}</td>
                <td>{kpi.department_id}</td>
                <td>{kpi.project_id}</td>
                <td>
                  <button
                    onClick={() => openEditModal(kpi)}
                    className="btn btn-small btn-edit"
                  >
                    Edit
                  </button>
                  {/* 🧹 NEW DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(kpi.kpi_id)}
                    className="btn btn-small btn-delete"
                    style={{
                      backgroundColor: "#d9534f",
                      color: "white",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shared Add/Edit Modal */}
      {isModalOpen && (
        <KpiModal
          newKpi={editingKpi || newKpi}
          handleInputChange={(e) => handleInputChange(e, !!editingKpi)}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          isEditing={!!editingKpi}
        />
      )}

      <br />
      <button onClick={openModal} className="btn">
        Add New KPI
      </button>
    </div>
  );
};

export default KpiManager;
