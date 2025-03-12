import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InspectionList = () => {
  const [inspections, setInspections] = useState([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/forms');
        setInspections(response.data);
      } catch (error) {
        console.error('Error fetching inspections:', error);
      }
    };

    fetchInspections();
  }, []);

  const getStatusClass = (status) => {
    const normalizedStatus = (status || 'Pending').toLowerCase();
    switch (normalizedStatus) {
      case 'pass': return 'status-pass';
      case 'fail': return 'status-fail';
      case 'hold': return 'status-hold';
      case 'pending':
      default:
        return 'status-pending';
    }
  };

  const filteredInspections = filterType === 'all' 
    ? inspections 
    : inspections.filter(insp => insp.inspectionType === filterType);

  return (
    <div className="inspection-list">
      <div className="header">
        <h2>Quality Inspections</h2>
        <Link to="/create" className="btn create-btn">
          New Inspection
        </Link>
      </div>

      <div className="filter-section">
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="Receiving">Receiving</option>
          <option value="In-Process">In-Process</option>
          <option value="Final">Final</option>
        </select>
      </div>

      <div className="inspections-grid">
        {filteredInspections.map(inspection => (
          <div key={inspection._id} className="inspection-card">
            <div className={`status-badge ${getStatusClass(inspection.status)}`}>
              {inspection.status || 'Pending'}
            </div>
            <h3>Lot #{inspection.lotNumber}</h3>
            <div className="inspection-details">
              <p><strong>Type:</strong> {inspection.inspectionType}</p>
              <p><strong>Inspector:</strong> {inspection.inspectorName}</p>
              <p><strong>Points:</strong> {inspection.fields.length}</p>
              <p><strong>Date:</strong> {new Date(inspection.createdAt).toLocaleDateString()}</p>
            </div>
            <Link to={`/inspection/${inspection._id}`} className="btn view-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
      
      {filteredInspections.length === 0 && (
        <div className="no-inspections">
          <p>No quality inspections found.</p>
        </div>
      )}
    </div>
  );
};

export default InspectionList;
