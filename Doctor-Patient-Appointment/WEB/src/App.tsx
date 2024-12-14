
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/admin';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import LoginPage from './components/login';
import NurseDashboard from './components/NurseDashboard';
import RegistrationPage from './components/registration';
import PatientDashboard from './components/user/PatientDashboard';
import PaymentPage from './components/user/Payment';
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Doctor-Patient Appointment</h1>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/nurse-dashboard" element={<NurseDashboard />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<PatientDashboard />}/>
          <Route path="/doctor-dashboard" element={<DoctorDashboard />}/>
          <Route path="/payment/:appointmentId" element={<PaymentPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
