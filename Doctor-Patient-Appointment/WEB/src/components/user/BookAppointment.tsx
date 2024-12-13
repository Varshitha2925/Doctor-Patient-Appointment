// src/components/BookAppointment.tsx
import axios from 'axios';
import React, { useState } from 'react';
import './BookAppointment.css';

interface BookAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({ isOpen, onClose }) => {
  const [doctorInfo, setDoctor] = useState('');
  const [userInfo, setUserInfo] = useState('John Doe');  // Replace with actual user info
  const [date, setDate] = useState('');
  const [breif, setbreif] = useState('');

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentData = {
      doctorInfo,
      userInfo,
      date,
      breif
    };
    try {
      const response = await axios.post(`http://localhost:3000/api/users/book-appointment`,appointmentData);
      console.log("OK")
      setSuccessMessage(response.data.message);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Failed to create appointment. Please try again.');
      setSuccessMessage(null);
    }
    console.log("Booking Appointment:", appointmentData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Book an Appointment</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Doctor:
            <select value={doctorInfo} onChange={(e) => setDoctor(e.target.value)} required>
              <option value="">Select Doctor</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. Johnson">Dr. Johnson</option>
            </select>
          </label>

          <label>
            Patient Info:
            <input type="text" value={userInfo} readOnly />
          </label>

          <label>
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>

          <label>
            Brief:
            <input type="text" value={breif} onChange={(e) => setbreif(e.target.value)} required/>
          </label>
          
          <button type="submit">Confirm Appointment</button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
