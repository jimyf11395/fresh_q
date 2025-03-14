import React, { useState, useEffect } from "react";
import axios from "axios";

const InspectorManager = () => {
  const [inspectors, setInspectors] = useState([]);
  const [newInspector, setNewInspector] = useState({
    name: "",
    department: "",
  });
  const [editingInspector, setEditingInspector] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInspectors();
  }, []);

  const fetchInspectors = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/inspectors");
      setInspectors(response.data);
    } catch (error) {
      console.error("Error fetching inspectors:", error);
      setError("Failed to load inspectors");
    }
  };

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingInspector({ ...editingInspector, [name]: value });
    } else {
      setNewInspector({ ...newInspector, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/inspectors",
        newInspector
      );
      setNewInspector({ name: "", department: "" });
      fetchInspectors();
      setError("");
    } catch (error) {
      console.error("Error creating inspector:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create inspector";
      setError(errorMessage);
    }
  };

  const handleEdit = (inspector) => {
    setEditingInspector(inspector);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5001/api/inspectors/${editingInspector._id}`,
        editingInspector
      );
      setEditingInspector(null);
      fetchInspectors();
      setError("");
    } catch (error) {
      console.error("Error updating inspector:", error);
      setError("Failed to update inspector");
    }
  };

  const handleToggleActive = async (inspector) => {
    try {
      await axios.patch(
        `http://localhost:5001/api/inspectors/${inspector._id}`,
        {
          active: !inspector.active,
        }
      );
      fetchInspectors();
      setError("");
    } catch (error) {
      console.error("Error toggling inspector status:", error);
      setError("Failed to update inspector status");
    }
  };

  return (
    <div className="inspector-manager">
      <h2>Manage Inspectors</h2>

      {/* Add New Inspector Form */}
      <div className="inspector-form">
        <h3>Add New Inspector</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={newInspector.name}
              onChange={(e) => handleInputChange(e)}
              placeholder="Full Name"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="department"
              value={newInspector.department}
              onChange={(e) => handleInputChange(e)}
              placeholder="Department"
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn">
            Add Inspector
          </button>
        </form>
      </div>

      {/* Inspectors List */}
      <div className="inspectors-list">
        <h3>Current Inspectors</h3>
        {error && <div className="error-message">{error}</div>}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Inspector ID</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inspectors.map((inspector) => (
                <tr
                  key={inspector._id}
                  className={!inspector.active ? "inactive" : ""}
                >
                  <td>{inspector.name}</td>
                  <td>{inspector.inspectorId}</td>
                  <td>{inspector.department}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        inspector.active ? "status-active" : "status-inactive"
                      }`}
                    >
                      {inspector.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(inspector)}
                      className="btn btn-small btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleActive(inspector)}
                      className={`btn btn-small ${
                        inspector.active ? "btn-deactivate" : "btn-activate"
                      }`}
                    >
                      {inspector.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Inspector Modal */}
      {editingInspector && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Inspector</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={editingInspector.name}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="Full Name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="inspectorId"
                  value={editingInspector.inspectorId}
                  className="form-input"
                  disabled
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="department"
                  value={editingInspector.department}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="Department"
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
                  onClick={() => setEditingInspector(null)}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectorManager;
