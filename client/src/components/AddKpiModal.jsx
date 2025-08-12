const AddKpiModal = ({
  newKpi,
  handleInputChange,
  handleSubmit,
  closeModal,
}) => (
  <div className="modal">
    <div className="modal-content">
      <h3>Add New KPI</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-input-title">Name</div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={newKpi.name}
            onChange={(e) => handleInputChange(e, false)}
            placeholder="KPI Name"
            className="form-input"
            required
          />
        </div>

        <div className="form-input-title">Value</div>
        <div className="form-group">
          <input
            type="number"
            name="value"
            value={newKpi.value}
            onChange={(e) => handleInputChange(e, false)}
            placeholder="Value"
            className="form-input"
            required
          />
        </div>

        <div className="modal-actions">
          <button type="submit" className="btn">
            Add KPI
          </button>
          <button type="button" onClick={closeModal} className="btn btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default AddKpiModal;
