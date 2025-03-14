import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({ name: "" });
  const [editingLocation, setEditingLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/locations");
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError("Failed to load locations");
    }
  };

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingLocation({ ...editingLocation, [name]: value });
    } else {
      setNewLocation({ ...newLocation, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/locations",
        newLocation
      );
      setNewLocation({ name: "" });
      fetchLocations();
      setError("");
    } catch (error) {
      console.error("Error creating location:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create location";
      setError(errorMessage);
    }
  };

  const handleEdit = (location) => {
    setEditingLocation(location);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/locations/${id}`);
      fetchLocations();
    } catch (error) {
      console.error("Error deleting location:", error);
      setError("Failed to delete location");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5001/api/locations/${editingLocation._id}`,
        editingLocation
      );
      setEditingLocation(null);
      fetchLocations();
      setError("");
    } catch (error) {
      console.error("Error updating location:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update location";
      setError(errorMessage);
    }
  };

  const handleToggleActive = async (location) => {
    try {
      await axios.patch(`http://localhost:5001/api/locations/${location._id}`, {
        active: !location.active,
      });
      fetchLocations();
      setError("");
    } catch (error) {
      console.error("Error toggling location status:", error);
      setError("Failed to update location status");
    }
  };

  return (
    <div className="inspector-manager">
      <h2>Manage Locations</h2>

      {/* Locations List */}
      <div className="inspectors-list">
        <h3>Current Locations</h3>
        {error && <div className="error-message">{error}</div>}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Location ID</th>
                <th>Country</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr
                  key={location._id}
                  className={!location.active ? "inactive" : ""}
                >
                  <td>{location.name}</td>
                  <td>{location.locationId}</td>
                  <td>{location.country}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        location.active ? "status-active" : "status-inactive"
                      }`}
                    >
                      {location.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(location)}
                      className="btn btn-small btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleActive(location)}
                      className={`btn btn-small ${
                        location.active ? "btn-deactivate" : "btn-activate"
                      }`}
                    >
                      {location.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Location Modal */}
      {editingLocation && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Location</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={editingLocation.name}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="Location Name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="locationId"
                  value={editingLocation.locationId}
                  className="form-input"
                  disabled
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="country"
                  value={editingLocation.country}
                  onChange={(e) => handleInputChange(e, true)}
                  placeholder="Country"
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
                  onClick={() => setEditingLocation(null)}
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

export default LocationManager;
