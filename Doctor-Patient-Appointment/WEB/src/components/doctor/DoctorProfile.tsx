// src/components/DoctorProfile.tsx
import React, { useState } from 'react';
import './DoctorProfile.css';
import { Doctor } from './types';

interface DoctorProfileProps {
  doctor: Doctor;
  onUpdate: (updatedDoctor: Doctor) => void;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor, onUpdate }) => {
  const [consultationFee, setConsultationFee] = useState(doctor.consultationFee);

  const handleFeeUpdate = () => {
    onUpdate({ ...doctor, consultationFee });
  };

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
      <button onClick={handleFeeUpdate}>Update Fee</button>
    </div>
  );
};

export default DoctorProfile;
