import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const InspectionView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inspection, setInspection] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [status, setStatus] = useState("Pending");
  const [comments, setComments] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchInspection = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/forms/${id}`
        );
        setInspection(response.data);
        setStatus(response.data.status);
        setComments(response.data.comments || "");

        // Initialize field values
        const values = {};
        response.data.fields.forEach((field) => {
          values[field.label] = field.value || "";
        });
        setFieldValues(values);
      } catch (error) {
        console.error("Error fetching inspection:", error);
      }
    };

    fetchInspection();
  }, [id]);

  const handleFieldChange = (fieldName, value) => {
    setFieldValues({
      ...fieldValues,
      [fieldName]: value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update status and comments
      await axios.patch(`http://localhost:5001/api/forms/${id}/status`, {
        status,
        comments,
      });

      navigate("/");
    } catch (error) {
      console.error("Error saving inspection:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!inspection) return <div>Loading...</div>;

  return (
    <div className="inspection-view">
      <div className="inspection-header">
        <h2>Quality Inspection - Lot #{inspection.lotNumber}</h2>
        <div className="inspection-meta">
          <p>
            <strong>Type:</strong> {inspection.inspectionType}
          </p>
          <p>
            <strong>Inspector:</strong> {inspection.inspector}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(inspection.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="inspection-form">
        <div className="inspection-fields">
          {/*    {inspection.fields.map((field, index) => (
            <div key={index} className="inspection-field">
              <label>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>
              {field.type === "boolean" ? (
                <select
                  value={fieldValues[field.label] || ""}
                  onChange={(e) =>
                    handleFieldChange(field.label, e.target.value)
                  }
                  className="field-input"
                  required={field.required}
                >
                  <option value="">Select...</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                </select>
              ) : field.type === "select" ? (
                <select
                  value={fieldValues[field.label] || ""}
                  onChange={(e) =>
                    handleFieldChange(field.label, e.target.value)
                  }
                  className="field-input"
                  required={field.required}
                >
                  <option value="">Select...</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={fieldValues[field.label] || ""}
                  onChange={(e) =>
                    handleFieldChange(field.label, e.target.value)
                  }
                  className="field-input"
                  required={field.required}
                />
              )}
            </div>
          ))} */}
        </div>

        <div className="inspection-status">
          <h3>Inspection Status</h3>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="status-select"
          >
            <option value="Pending">Pending</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
            <option value="Hold">Hold</option>
          </select>

          <h3>Comments</h3>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="comments-input"
            placeholder="Add any additional comments or observations..."
          />
        </div>

        <div className="inspection-actions">
          <button
            onClick={handleSave}
            className="btn save-btn"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Inspection"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspectionView;
