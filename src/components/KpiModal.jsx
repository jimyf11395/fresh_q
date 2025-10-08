import { useRef, useEffect } from "react";

const KpiModal = ({
  newKpi,
  handleInputChange,
  handleSubmit,
  closeModal,
  isEditing = false, // ✅ new prop for mode
}) => {
  const modalRef = useRef();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeModal]);

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-content wide">
        {/* ✅ Dynamic title */}
        <h3 className="modal-title">
          {isEditing ? "Edit KPI" : "Add New KPI"}
        </h3>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Name */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={newKpi.name}
              onChange={(e) => handleInputChange(e, false)}
              placeholder="KPI Name"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group span-2">
            <label>Description</label>
            <textarea
              name="description"
              value={newKpi.description}
              onChange={(e) => handleInputChange(e, false)}
              placeholder="Brief description"
              rows="2"
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={newKpi.category}
              onChange={(e) => handleInputChange(e, false)}
              placeholder="Financial, Operational, etc."
            />
          </div>

          {/* Unit */}
          <div className="form-group">
            <label>Unit</label>
            <input
              type="text"
              name="unit"
              value={newKpi.unit}
              onChange={(e) => handleInputChange(e, false)}
              placeholder="%, USD, Hours..."
            />
          </div>

          {/* Frequency */}
          <div className="form-group">
            <label>Frequency</label>
            <select
              name="frequency"
              value={newKpi.frequency}
              onChange={(e) => handleInputChange(e, false)}
              required
            >
              <option value="">Select frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annually">Annually</option>
            </select>
          </div>

          {/* Formula */}
          <div className="form-group span-2">
            <label>Formula</label>
            <textarea
              name="formula"
              value={newKpi.formula}
              onChange={(e) => handleInputChange(e, false)}
              placeholder="Formula used to calculate this KPI"
              rows="2"
            />
          </div>

          {/* Owner */}
          <div className="form-group">
            <label>Owner User ID</label>
            <input
              type="number"
              name="owner_user_id"
              value={newKpi.owner_user_id}
              onChange={(e) => handleInputChange(e, false)}
              placeholder="User ID"
            />
          </div>

          {/* Department */}
          <div className="form-group">
            <label>Department ID</label>
            <input
              type="number"
              name="department_id"
              value={newKpi.department_id}
              onChange={(e) => handleInputChange(e, false)}
              placeholder="Department ID"
            />
          </div>

          {/* Project */}
          <div className="form-group">
            <label>Project ID</label>
            <input
              type="number"
              name="project_id"
              value={newKpi.project_id}
              onChange={(e) => handleInputChange(e, false)}
              placeholder="Project ID"
            />
          </div>

          {/* Buttons */}
          <div className="form-actions span-3">
            {/* ✅ Dynamic button text */}
            <button type="submit" className="btn">
              {isEditing ? "Save Changes" : "Add KPI"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KpiModal;
