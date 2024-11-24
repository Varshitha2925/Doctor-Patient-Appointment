import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DoctorAppointments.css';
import './DoctorProfile.css';

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

const UpdateDoctorProfile: React.FC = () => {
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

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDoctorProfile((prevProfile) => ({
      ...prevProfile,
      [name]:
        name === 'feesPerConsultation' ? parseFloat(value) : value,
    }));
  };

  const handleSpecializationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDoctorProfile((prevProfile) => ({
      ...prevProfile,
      specialization: value.split(',').map((s) => s.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/doctor/updateProfile`,
        doctorProfile
      );
      console.log("Done")
      setSuccessMessage(response.data.message);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="profile-section">
      <h2>Update Doctor Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={doctorProfile.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={doctorProfile.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={doctorProfile.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={doctorProfile.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Specialization:</label>
          <input
            type="text"
            value={doctorProfile.specialization.join(', ')}
            onChange={handleSpecializationChange}
            placeholder="Comma-separated values"
          />
        </div>
        <div>
          <label>Experience:</label>
          <input
            type="text"
            name="experience"
            value={doctorProfile.experience}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Fees Per Consultation:</label>
          <input
            type="number"
            name="feesPerConsultation"
            value={doctorProfile.feesPerConsultation}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default UpdateDoctorProfile;
