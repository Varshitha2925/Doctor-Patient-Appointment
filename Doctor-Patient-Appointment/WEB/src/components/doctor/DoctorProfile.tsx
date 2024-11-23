// src/components/DoctorProfile.tsx
import React, { useState } from 'react';
import './DoctorProfile.css';
import UpdateDoctorProfile from './DoctorProfileForm';
import { Doctor } from './types';

interface DoctorProfileProps {
  doctor: Doctor;
  onUpdate: (updatedDoctor: Doctor) => void;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor, onUpdate }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);
  const [consultationFee, setConsultationFee] = useState(doctor.consultationFee);

//   const handleUpdateClick = () => {
//     // Open a new pop-up window with specific dimensions
//     window.open(
//         '/update-doctor-profile',
//         '_blank',
//         'width=600,height=400,scrollbars=yes,resizable=yes'
//     );
// };

  return (
    <div className="profile-section">
      <h3>Doctor Profile</h3>
      <p>Name: {doctor.name}</p>
      <p>Specialization: {doctor.specialization}</p>
      <label>
        Consultation Fee: $
        <input
          type="number"
          value={consultationFee}
          onChange={(e) => setConsultationFee(parseInt(e.target.value))}
        />
      </label>
      {/* <button onClick={handleUpdateClick}>Update Fee</button> */}
      <button onClick={openBooking}>Update</button>
      
      {/* Book Appointment pop-up component */}
      <UpdateDoctorProfile isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
};

export default DoctorProfile;
