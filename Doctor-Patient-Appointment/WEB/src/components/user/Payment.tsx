
  import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Payment.css';
  
  const PaymentPage: React.FC = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);
    const {appointmentId } = useParams<{ appointmentId: string }>();
    console.log("eventId", appointmentId)
    const navigate = useNavigate();
    const handlePayment = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Mock payment processing
      if (cardNumber && expiryDate && cvv && name) {
        const paymentData = {
          appointmentId,
          cardNumber,
          expiryDate,
          cvv,
          name,
        };
    
        try {
          const response = await axios.post('http://localhost:3000/api/users/payment', paymentData);
          console.log('Payment Successful:', response.data);
          // window.alert('Event booked sucessfully');
          navigate(`/dashboard`);
          
          setSuccess(true);
        } catch (error) {
          console.error('Payment Failed:', error);
          setSuccess(false);
        }
        setSuccess(true);
      } else {
        alert('Please fill out all the fields.');
      }
    };
  
    return (
      <div className="payment-page">
        {success ? (
          <div className="success-message">

            <h1>Payment Successful!</h1>
            <p>Thank you for your booking. Enjoy the event!</p>
          </div>
        ) : (
          <div className="payment-form-container">
            <h1>Payment Page</h1>
            Total fee is : $150

            <p>Enter your payment details below:</p>
            <form className="payment-form" onSubmit={handlePayment}>
              <label htmlFor="name">Cardholder's Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
  
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
                maxLength={16}
              />
  
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
  
              <label htmlFor="cvv">CVV:</label>
              <input
                type="password"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                required
                maxLength={3}
              />
  
              <button type="submit" className="pay-button">
                Pay Now
              </button>
            </form>
          </div>
        )}
      </div>
    );
  };
  
  export default PaymentPage;
  
  