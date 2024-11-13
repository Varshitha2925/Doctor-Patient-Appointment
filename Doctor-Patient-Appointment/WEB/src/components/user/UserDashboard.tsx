// src/components/UserDashboard.tsx
import React, { useState } from 'react';
import AppointmentBookingModal from './AppointmentBookingModal.tsx';
import DeleteConfirmationModal from './DeleteConfirmationModal.tsx';
import PaymentModal from './PaymentModal.tsx';

const UserDashboard: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  const openDeleteModal = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div>
      <h1>User Dashboard</h1>
      <button onClick={openBookingModal}>Book Appointment</button>
      
      <AppointmentBookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} onBook={openPaymentModal} />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={closePaymentModal} />
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} appointmentId={selectedAppointmentId} />

      <h3>Your Appointments</h3>
      {/* Example: List of appointments with delete option */}
      <button onClick={() => openDeleteModal('appointmentId')}>Delete Appointment</button>
    </div>
  );
};

export default UserDashboard;
