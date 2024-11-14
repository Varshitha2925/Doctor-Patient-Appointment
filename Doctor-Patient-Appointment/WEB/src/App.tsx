// // src/App.tsx
// import React from 'react';
// // import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// // import DoctorDashboard from './components/DoctorDashboard';
// // import DoctorProfileModal from './components/DoctorProfileModal';
// // import TimeSlotModal from './components/TimeSlotModal';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import './App.css';
// import PatientDashboard from './components/user/PatientDashboard';


// const App: React.FC = () => {
//   return (
//     // <Router>
//     //   <Routes>
//     //     <Route path="/" element={<DoctorDashboard />} />
//     //     <Route path="/doctor-profile" element={<DoctorProfileModal isOpen={false} onClose={function (): void {
//     //       throw new Error('Function not implemented.');
//     //     } } />} />
//     //     <Route path="/time-slots" element={<TimeSlotModal isOpen={false} onClose={function (): void {
//     //       throw new Error('Function not implemented.');
//     //     } } />} />
//     //   </Routes>
//     // </Router>
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <h1>Doctor Appointment Management System</h1>
//         </header>

//         <Routes>
//           {/* Home or default route */}
//           <Route path="/" element={<h2>Welcome to the Healthcare System</h2>} />

//           {/* Patient Dashboard route */}
//           <Route path="/patient-dashboard" element={<PatientDashboard />} />
          
//           {/* Additional routes could be added here, e.g., AdminDashboard, DoctorDashboard, etc. */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
// src/App.tsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NurseDashboard from './components/NurseDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Doctor-Patient Appointment</h1>
        <Routes>
          <Route path="/" element={<NurseDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
