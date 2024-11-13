// src/components/TimeSlotModal.tsx
import React from 'react';
import Modal from 'react-modal';

interface TimeSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimeSlotModal: React.FC<TimeSlotModalProps> = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Select Time Slots"
    className="modal-content"
    overlayClassName="modal-overlay"
  >
    <h2>Select Time Slots</h2>
    {/* Content of the modal */}
    <button onClick={onClose}>Close</button>
  </Modal>
);

export default TimeSlotModal;
