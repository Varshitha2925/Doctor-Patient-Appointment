// src/components/AppointmentModal.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface AppointmentModalProps {
  userId: string;
  appointmentId: string;
  comments: string;
  onClose: () => void;
  onUpdate: (updatedComments: string) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  userId,
  appointmentId,
  comments: initialComments,
  onClose,
  onUpdate,
}) => {
  const [patientInfo, setPatientInfo] = useState<any | null>(null);
  const [comments, setComments] = useState(initialComments || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatientDetails = async () => {
        console.log("USER DETAILS", userId)
      try {
        const response = await axios.get(`http://localhost:3000/api/users/currentUser/${userId}`);
        console.log("RESPONSE USER", response)
        setPatientInfo(response.data.data); // Assuming API returns patient info
      } catch (error) {
        console.error('Error fetching patient details:', error);
        setPatientInfo(null); // Handle error, show message
      }
    };

    fetchPatientDetails();
  }, [userId]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/users/updateComments', {
        appointmentId,
        comments,
      });
      onUpdate(comments);
    } catch (error) {
      console.error('Error updating comments:', error);
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Appointment Details</h3>
        
        {patientInfo ? (
          <>
            <h4>Patient Information</h4>
            <p><strong>Username:</strong> {patientInfo.username}</p>
            <p><strong>Email:</strong> {patientInfo.email}</p>
            <p><strong>City:</strong> {patientInfo.city}</p>
            <p><strong>State:</strong> {patientInfo.state}</p>
            <p><strong>Zipcode:</strong> {patientInfo.zipcode}</p>
            <p><strong>Insurance:</strong> {patientInfo.insuarance}</p>
          </>
        ) : (
          <p>Loading patient information...</p>
        )}

        <label>
          Comments:
          <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
        </label>

        <div className="modal-actions">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
