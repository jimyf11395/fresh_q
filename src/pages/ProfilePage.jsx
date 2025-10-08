import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../index.css"; // or a specific CSS file

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    password: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("email", formData.email);
    form.append("first_name", formData.first_name);
    form.append("last_name", formData.last_name);
    if (formData.password) form.append("password", formData.password);
    if (profileImage) form.append("profileImage", profileImage);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/update`,
        {
          method: "POST",
          body: form,
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Update failed");

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="image-section">
          <label htmlFor="imageUpload" className="image-label">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="profile-pic" />
            ) : (
              <div className="profile-pic-placeholder">Upload Image</div>
            )}
          </label>
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password (optional)"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
