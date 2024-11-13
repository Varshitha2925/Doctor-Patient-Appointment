// src/App.tsx
import React from 'react';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import DoctorDashboard from './components/DoctorDashboard';
// import DoctorProfileModal from './components/DoctorProfileModal';
// import TimeSlotModal from './components/TimeSlotModal';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import UserDashboard from './components/user/UserDashboard';


const App: React.FC = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<DoctorDashboard />} />
    //     <Route path="/doctor-profile" element={<DoctorProfileModal isOpen={false} onClose={function (): void {
    //       throw new Error('Function not implemented.');
    //     } } />} />
    //     <Route path="/time-slots" element={<TimeSlotModal isOpen={false} onClose={function (): void {
    //       throw new Error('Function not implemented.');
    //     } } />} />
    //   </Routes>
    // </Router>
    <Router>
    <div className="App">
      <Routes>
        {/* Define the User Dashboard Route */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        
        {/* Add other routes as needed */}
        <Route path="/" element={<h1>Welcome to the Doctor Appointment System</h1>} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;