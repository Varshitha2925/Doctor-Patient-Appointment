import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Doctor {
  doctorId: string;
  name: string;
  timeSlots: string[];
}

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
}

const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({ isOpen, onClose, onBook }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      axios.get('/api/doctors').then((response) => {
        setDoctors(response.data);
      });
    }
  }, [isOpen]);

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedTimeSlot) return alert('Please select a doctor and a time slot.');

    await axios.post('/api/appointments', {
      doctorId: selectedDoctor,
      timeSlot: selectedTimeSlot,
    });
    onBook(); // Trigger payment modal
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Book Appointment</h2>
      <label>Select Doctor:</label>
      <select onChange={(e) => setSelectedDoctor(e.target.value)} value={selectedDoctor}>
        <option value="">Select</option>
        {doctors.map((doctor) => (
          <option key={doctor.doctorId} value={doctor.doctorId}>
            {doctor.name}
          </option>
        ))}
      </select>

      <label>Select Time Slot:</label>
      <select onChange={(e) => setSelectedTimeSlot(e.target.value)} value={selectedTimeSlot} disabled={!selectedDoctor}>
        <option value="">Select Time Slot</option>
        {doctors
          .find((doctor) => doctor.doctorId === selectedDoctor)
          ?.timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
      </select>

      <button onClick={handleBookAppointment}>Confirm Appointment</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AppointmentBookingModal;
