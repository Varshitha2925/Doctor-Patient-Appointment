// src/App.tsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorProfileModal from './components/DoctorProfileModal';
import TimeSlotModal from './components/TimeSlotModal';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorDashboard />} />
        <Route path="/doctor-profile" element={<DoctorProfileModal isOpen={false} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/time-slots" element={<TimeSlotModal isOpen={false} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
      </Routes>
    </Router>
  );
};

export default App;