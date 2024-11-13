import React from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePayment = async () => {
    // Mock payment process or integrate payment gateway
    console.log('Payment processed');
    onClose();
  };

  return (
    <div className="modal">
      <h2>Payment</h2>
      <p>Complete payment to confirm your appointment.</p>
      <button onClick={handlePayment}>Pay Now</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default PaymentModal;
