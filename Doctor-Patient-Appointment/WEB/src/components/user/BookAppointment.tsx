// src/components/BookAppointment.tsx
import React, { useState } from 'react';
import './BookAppointment.css';

interface BookAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({ isOpen, onClose }) => {
  const [doctor, setDoctor] = useState('');
  const [userInfo, setUserInfo] = useState('John Doe');  // Replace with actual user info
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [status] = useState('Scheduled');
  const [insurance, setInsurance] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentData = {
      doctor,
      userInfo,
      date,
      timeSlot,
      status,
      insurance,
    };
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
            <select value={doctor} onChange={(e) => setDoctor(e.target.value)} required>
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
            Time Slot:
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
              <option value="">Select Time Slot</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
            </select>
          </label>

          <label>
            Status:
            <input type="text" value={status} readOnly />
          </label>

          <label>
            Use Insurance:
            <input
              type="checkbox"
              checked={insurance}
              onChange={(e) => setInsurance(e.target.checked)}
            />
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
