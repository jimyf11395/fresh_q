import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import InspectionList from './components/InspectionList';
import InspectionForm from './components/InspectionForm';
import InspectionView from './components/InspectionView';
import InspectorManager from './components/InspectorManager';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<InspectionList />} />
            <Route path="/create" element={<InspectionForm />} />
            <Route path="/inspection/:id" element={<InspectionView />} />
            <Route path="/inspectors" element={<InspectorManager />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
