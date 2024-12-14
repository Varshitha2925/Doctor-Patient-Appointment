// src/components/PatientDashboard.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentHistory from './AppointmentHistory';
import BookAppointment from './BookAppointment';
import './PatientDashboard.css';

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const logOut = () => {
    navigate('/')
  }
  
  return (
    <div className="patient-dashboard">
      <div className="dashboard-section">
        {/* Button to open Book Appointment pop-up */}
                <button onClick={logOut} className="logout-btn">Log Out</button>

      <button onClick={openBooking} className="book-appointment-btn">Book an Appointment</button>

      <div>Patient name: userInfo</div>
      
      {/* Book Appointment pop-up component */}
      <BookAppointment isOpen={isBookingOpen} onClose={closeBooking} />
      </div>
      <div className="dashboard-section">
        <AppointmentHistory />
      </div>
      
    </div>
  );
};

export default PatientDashboard;

