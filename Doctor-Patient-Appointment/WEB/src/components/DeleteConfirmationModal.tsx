import axios from 'axios';
import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string | null;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, appointmentId }) => {
  if (!isOpen || !appointmentId) return null;

  const handleDelete = async () => {
    await axios.delete(`/api/appointments/${appointmentId}`);
    console.log(`Deleted appointment ${appointmentId}`);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this appointment?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DeleteConfirmationModal;
