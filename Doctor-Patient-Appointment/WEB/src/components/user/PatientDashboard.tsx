// src/components/PatientDashboard.tsx
import React, { useState } from 'react';
import AppointmentHistory from './AppointmentHistory';
import BookAppointment from './BookAppointment';
import './PatientDashboard.css';

const PatientDashboard: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);
  
  return (
    <div className="patient-dashboard">
      <div className="dashboard-section">
        {/* Button to open Book Appointment pop-up */}
      <button onClick={openBooking} className="book-appointment-btn">Book an Appointment</button>
      
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

