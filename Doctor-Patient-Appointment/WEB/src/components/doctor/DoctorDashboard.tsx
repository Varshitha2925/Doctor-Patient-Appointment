// src/components/DoctorDashboard.tsx
import React from 'react';
import DoctorAppointments from './DoctorAppointments';
import DoctorAvailability from './DoctorAvailability';
import './DoctorDashboard.css';
import './DoctorProfile.css';
import UpdateDoctorProfile from './DoctorProfileForm';
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

const DoctorDashboard: React.FC = () => {

  return (
    <div className="doctor-dashboard">
      <UpdateDoctorProfile />
      <DoctorAvailability />
      <DoctorAppointments />
    </div>
  );
};

export default DoctorDashboard;
