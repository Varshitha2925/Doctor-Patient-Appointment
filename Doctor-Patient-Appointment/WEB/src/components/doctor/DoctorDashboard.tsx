// src/components/DoctorDashboard.tsx
import React from 'react';
import AppointmentList from './AppointmentList';

const DoctorDashboard: React.FC = () => {
  const openProfilePopup = () => {
    window.open(
      '/doctor-profile',
      'DoctorProfile',
      'width=600,height=400,left=200,top=200'
    );
  };

  const openTimeSlotPopup = () => {
    window.open(
      '/time-slots',
      'TimeSlots',
      'width=600,height=400,left=250,top=250'
    );
  };

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <button onClick={openProfilePopup}>View Doctor Profile</button>
      <button onClick={openTimeSlotPopup}>Select Time Slots</button>

      <AppointmentList />
    </div>
  );
};

export default DoctorDashboard;
