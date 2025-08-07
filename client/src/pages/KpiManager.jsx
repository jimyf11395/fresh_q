import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const KpiManager = () => {
  const [kpis, setKpis] = useState([]);
  const [newKpi, setNewKpi] = useState({
    kpiId: "",
    name: "",
    value: "",
    active: true,
  });
  const [editingKpi, setEditingKpi] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchKpis();
  }, []);

  const fetchKpis = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/kpis`
      );
      setKpis(response.data);
    } catch (error) {
      console.error("Error fetching kpis:", error);
      setError("Failed to load kpis");
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
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/kpis`,
        newKpi
      );
      setNewKpi({
        name: "",
        value: "",
      });
      fetchKpis();
      setError("");
      closeModal();
    } catch (error) {
      console.error("Error creating kpi:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create kpi";
      setError(errorMessage);
    }
  };

  const handleEdit = (kpi) => {
    setEditingKpi(kpi);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/api/kpis/${editingKpi._id}`,
        editingKpi
      );
      setEditingKpi(null);
      fetchKpis();
      setError("");
    } catch (error) {
      console.error("Error updating kpi:", error);
      setError("Failed to update kpi");
    }
  };

  const handleToggleActive = async (kpi) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/api/kpis/${kpi._id}`,
        {
          active: !kpi.active,
        }
      );
      fetchKpis();
      setError("");
    } catch (error) {
      console.error("Error toggling kpi status:", error);
      setError("Failed to update kpi status");
    }
  };

  return (
    <div className="kpi-manager">
      <h2>Manage KPIs</h2>

      {/* KPI List */}
      <div className="kpi-list">
        <h3>Current KPIs</h3>
        {error && <div className="error-message">{error}</div>}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>KPI ID</th>
                <th>Name</th>
                <th>Value</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi) => (
                <tr key={kpi._id} className={!kpi.active ? "inactive" : ""}>
                  <td>{kpi.kpiId}</td>
                  <td>{kpi.name}</td>
                  <td>{kpi.value}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        kpi.active ? "status-active" : "status-inactive"
                      }`}
                    >
                      {kpi.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(kpi)}
                      className="btn btn-small btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleActive(kpi)}
                      className={`btn btn-small ${
                        kpi.active ? "btn-deactivate" : "btn-activate"
                      }`}
                    >
                      {kpi.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit KPI Modal */}
      {editingKpi && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit KPI</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <input
                  type="text"
                  name="kpiId"
                  value={editingKpi.kpiId}
                  className="form-input"
                  disabled
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={editingKpi.name}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="KPI Name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="value"
                  value={editingKpi.value}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="value"
                  className="form-input"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingKpi(null)}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <br />
    </div>
  );
};

export default KpiManager;
