import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InspectionForm = () => {
  const navigate = useNavigate();
  const generateInspectionId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `QI${year}${month}${day}-${random}`;
  };

  const [inspectors, setInspectors] = useState([]);
  const [inspectionData, setInspectionData] = useState({
    inspectionId: generateInspectionId(),
    lotNumber: '',
    inspectionType: 'Receiving',
    inspector: '',
    inspectorName: '',
    status: 'Pending',
    comments: ''
  });

  useEffect(() => {
    const fetchInspectors = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/inspectors', {
          params: { activeOnly: true }
        });
        setInspectors(response.data);
      } catch (error) {
        console.error('Error fetching inspectors:', error);
      }
    };
    fetchInspectors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/forms', inspectionData);
      navigate('/');
    } catch (error) {
      console.error('Error creating inspection:', error);
    }
  };

  return (
    <div className="inspection-form">
      <h2>New Quality Inspection</h2>
      <div className="form-section">
        <div className="inspection-id">
          <label>Inspection ID:</label>
          <span className="id-value">{inspectionData.inspectionId}</span>
        </div>
        <input
          type="text"
          placeholder="Lot Number"
          value={inspectionData.lotNumber}
          onChange={(e) => setInspectionData({ ...inspectionData, lotNumber: e.target.value })}
          className="form-input"
          required
        />
        <select
          value={inspectionData.inspectionType}
          onChange={(e) => setInspectionData({ ...inspectionData, inspectionType: e.target.value })}
          className="form-select"
          required
        >
          <option value="Receiving">Receiving</option>
          <option value="In-Process">In-Process</option>
          <option value="Final">Final</option>
        </select>
        <select
          value={inspectionData.status}
          onChange={(e) => setInspectionData({ ...inspectionData, status: e.target.value })}
          className="form-select"
          required
        >
          <option value="Pending">Pending</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
          <option value="Hold">Hold</option>
        </select>
        <select
          value={inspectionData.inspector}
          onChange={(e) => {
            const selectedInspector = inspectors.find(i => i._id === e.target.value);
            setInspectionData({
              ...inspectionData,
              inspector: e.target.value,
              inspectorName: selectedInspector ? selectedInspector.name : ''
            });
          }}
          className="form-select"
          required
        >
          <option value="">Select Inspector</option>
          {inspectors
            .filter(inspector => inspector.active)
            .map(inspector => (
              <option key={inspector._id} value={inspector._id}>
                {inspector.name} ({inspector.inspectorId})
              </option>
            ))}
        </select>
      </div>





      <div className="form-section">
        <textarea
          placeholder="Additional Comments"
          value={inspectionData.comments}
          onChange={(e) => setInspectionData({ ...inspectionData, comments: e.target.value })}
          className="form-textarea"
        />
      </div>

      <button onClick={handleSubmit} className="btn submit-btn">
        Create Inspection
      </button>
    </div>
  );
};

export default InspectionForm;
