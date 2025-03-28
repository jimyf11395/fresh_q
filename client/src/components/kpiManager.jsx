import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const KpiManager = () => {
  const [kpis, setKpis] = useState([]);
  const [newKpi, setNewKpi] = useState({
    kpiName: "",
    currentValue: "",
    unitOfMeasure: "",
    source: "",
    formula: "",
    bottomLimit: null,
    topLimit: null,
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
      const response = await axios.get("http://localhost:5001/api/kpis");
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
      await axios.post("http://localhost:5001/api/kpis", newKpi);
      setNewKpi({
        kpiName: "",
        currentValue: "",
        unitOfMeasure: "",
        source: "",
        formula: "",
        bottomLimit: null,
        topLimit: null,
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
        `http://localhost:5001/api/kpis/${editingKpi._id}`,
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
      await axios.patch(`http://localhost:5001/api/kpis/${kpi._id}`, {
        active: !kpi.active,
      });
      fetchKpis();
      setError("");
    } catch (error) {
      console.error("Error toggling kpi status:", error);
      setError("Failed to update kpi status");
    }
  };

  const AddKpiModal = () => (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          width: "400px",
          height: "500px",
          margin: "auto",
          padding: "20px",
        },
      }}
    >
      <h2>Add New KPI</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="kpiName"
            value={newKpi.kpiName}
            onChange={(e) => handleInputChange(e, false)}
            placeholder="KPI Name"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="currentValue"
            value={newKpi.currentValue}
            onChange={(e) => handleInputChange(e, false)}
            placeholder="Current Value"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="unitOfMeasure"
            value={newKpi.unitOfMeasure}
            onChange={(e) => handleInputChange(e, false)}
            placeholder="Unit of Measure"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="source"
            value={newKpi.source}
            onChange={(e) => handleInputChange(e, false)}
            placeholder="Source"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="formula"
            value={newKpi.formula}
            onChange={(e) => handleInputChange(e, false)}
            placeholder="Formula"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="bottomLimit"
            value={newKpi.bottomLimit || ""}
            onChange={(e) => handleInputChange(e, false)}
            placeholder="Bottom Limit"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="topLimit"
            value={newKpi.topLimit || ""}
            onChange={(e) => handleInputChange(e, false)}
            placeholder="Top Limit"
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="btn">
          Add KPI
        </button>
      </form>
    </Modal>
  );

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
                <th>Current Value</th>
                <th>Unit of Measure</th>
                <th>Source</th>
                <th>Formula</th>
                <th>Bottom Limit</th>
                <th>Top Limit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi) => (
                <tr key={kpi._id} className={!kpi.active ? "inactive" : ""}>
                  <td>{kpi.kpiId}</td>
                  <td>{kpi.kpiName}</td>
                  <td>{kpi.currentValue}</td>
                  <td>{kpi.unitOfMeasure}</td>
                  <td>{kpi.source}</td>
                  <td>{kpi.formula}</td>
                  <td>{kpi.bottomLimit}</td>
                  <td>{kpi.topLimit}</td>
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
                  name="kpiName"
                  value={editingKpi.kpiName}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="KPI Name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="currentValue"
                  value={editingKpi.currentValue}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="Current Value"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="unitOfMeasure"
                  value={editingKpi.unitOfMeasure}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="Unit of Measure"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="source"
                  value={editingKpi.source}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="Source"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="formula"
                  value={editingKpi.formula}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="Formula"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="bottomLimit"
                  value={editingKpi.bottomLimit || ""}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="Bottom Limit"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="topLimit"
                  value={editingKpi.topLimit || ""}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="Top Limit"
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
      <button onClick={openModal} className="btn">
        Add New KPI
      </button>
      <AddKpiModal />
    </div>
  );
};

export default KpiManager;
