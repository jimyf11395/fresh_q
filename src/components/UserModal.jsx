import { useRef, useEffect } from "react";

const UserModal = ({
  newUser,
  handleInputChange,
  handleSubmit,
  closeModal,
  isEditing = false, // ✅ new prop to determine mode
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
          {isEditing ? "Edit User" : "Add New User"}
        </h3>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={newUser.email}
              onChange={(e) => handleInputChange(e, false)}
              placeholder="Email"
              required
            />
          </div>

          {/* Username */}
          <div className="form-group span-2">
            <label>Username</label>
            <textarea
              name="username"
              value={newUser.username}
              onChange={(e) => handleInputChange(e, false)}
              placeholder="Username"
              rows="2"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={(e) => handleInputChange(e, false)}
              placeholder="Password"
            />
          </div>

          {/* Role */}
          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={newUser.role}
              onChange={(e) => handleInputChange(e, false)}
              required
            >
              <option value="">Select role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Analyst">Analyst</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="form-actions span-3">
            {/* ✅ Dynamic button text */}
            <button type="submit" className="btn">
              {isEditing ? "Save Changes" : "Add User"}
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

export default UserModal;
