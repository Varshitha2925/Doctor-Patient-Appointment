// src/components/DoctorDashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorAppointments from './DoctorAppointments';
import DoctorAvailability from './DoctorAvailability';
import './DoctorDashboard.css';
import './DoctorProfile.css';
// import { Appointment, Doctor, PatientRecord } from './types';

export interface Appointment {
  userInfo: String;
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: 'Pending' | 'Accepted' | 'Cancelled';
  medicalHistory: string;
}
const userId = localStorage.getItem("userId");
  console.log("USERID",userId)

const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const logOut = () => {
    navigate('/')
  }

  return (
    <div>
      <button onClick={logOut} className="logout-btn">Log Out</button>
    <div className="doctor-dashboard">

      {/* <UpdateDoctorProfile /> */}
      <DoctorAvailability />
      <DoctorAppointments />
    </div>
    </div>
  );
};

export default DoctorDashboard;
