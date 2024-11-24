// src/components/DoctorProfile.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DoctorProfile.css';
import UpdateDoctorProfile from './DoctorProfileForm';

export interface DoctorProfile {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  specialization: string[];
  experience: string;
  feesPerConsultation: number;
  status: string;
  timings: string[];
}
const DoctorProfile: React.FC<DoctorProfile> = ({}) => {
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile>({
    userId: '643fbc9ecab1ed35f0534e6a',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    specialization: [],
    experience: '',
    feesPerConsultation: 50,
    status: '',
    timings: [],
  });
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  useEffect(() => {
    // Fetch the existing doctor profile
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/doctor/getDoctorInfo',
          {
            userId: '643fbc9ecab1ed35f0534e6a',
          }
        );
        setDoctorProfile(response.data.data);
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
    };

    fetchDoctorProfile();
  }, []);
  
  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);
  const [consultationFee, setConsultationFee] = useState(doctorProfile.feesPerConsultation);

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
      <p>Name: {doctorProfile.firstName}</p>
      <p>Specialization: {doctorProfile.specialization}</p>
      <label>
        Consultation Fee: $
        <input
          type="text"
          value={doctorProfile.feesPerConsultation}
          onChange={(e) => setConsultationFee(parseInt(e.target.value))}
        />
      </label>
      {/* <button onClick={handleUpdateClick}>Update Fee</button> */}
      <button onClick={openBooking}>Update</button>
      
      {/* Book Appointment pop-up component */}
      <UpdateDoctorProfile />
    </div>
  );
};

export default DoctorProfile;
