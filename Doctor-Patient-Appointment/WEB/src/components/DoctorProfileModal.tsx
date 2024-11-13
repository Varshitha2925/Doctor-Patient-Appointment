// src/components/DoctorProfileModal.tsx
import React from 'react';
import Modal from 'react-modal';

interface DoctorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Doctor Profile"
    className="modal-content"
    overlayClassName="modal-overlay"
  >
    <h2>Doctor Profile</h2>
    {/* Content of the modal */}
    <button onClick={onClose}>Close</button>
  </Modal>
);

export default DoctorProfileModal;