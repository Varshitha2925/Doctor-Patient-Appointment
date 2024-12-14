// src/components/PatientDashboard.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentHistory from './AppointmentHistory';
import BookAppointment from './BookAppointment';
import './PatientDashboard.css';

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [username, setusername] = useState('')
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const userId = localStorage.getItem("userId");
  console.log("USERID",userId)
  const logOut = () => {
    navigate('/')
  }

  useEffect(() => {
    fetchPatientDetails();
    }, []);

  const fetchPatientDetails = async () => {
    console.log("USER DETAILS", userId)
  try {
    const response = await axios.get(`http://localhost:3000/api/users/currentUser/${userId}`);
    console.log("RESPONSE USER", response)
    // setPatientInfo(response.data.data); // Assuming API returns patient info
    setusername(response.data.data.username)
  } catch (error) {
    console.error('Error fetching patient details:', error);
    // setPatientInfo(null); // Handle error, show message
  }
};
  
  return (
    <div className="patient-dashboard">
      <div className="dashboard-section">
        {/* Button to open Book Appointment pop-up */}
        <button onClick={logOut} className="logout-btn">Log Out</button>

      <button onClick={openBooking} className="book-appointment-btn">Book an Appointment</button>

      <div>Patient Name:  {username} </div>
      
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

