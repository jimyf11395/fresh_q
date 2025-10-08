// src/components/KpiCard.jsx

const KpiCard = ({ value, label }) => (
  <div className="kpi">
    <h1>{value}</h1>
    <p>{label}</p>
  </div>
);

export default KpiCard;
