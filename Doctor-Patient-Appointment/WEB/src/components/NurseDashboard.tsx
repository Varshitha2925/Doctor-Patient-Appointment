// src/components/NurseDashboard.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentModal from './AppointmentModal'; // Import the Appointment Modal component
import './NurseDashboard.css';

interface Appointment {
  comments: string;
  userId: string;
  paid: any;
  doctorInfo: string;
  _id: string;
  userInfo: string;
  doctorName: string;
  date: string;
  time: string;
  status: string;
}

const NurseDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/todaysappointments'); // Endpoint to fetch today's appointments
        setAppointments(response.data.data);  // Assuming the API response contains a list of appointments
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
  };
  const navigate = useNavigate();
  const logOut = () => {
    navigate('/')
  }

  return (
    <div className="dashboard">
    <button onClick={logOut} className="logout-btn">Log Out</button>
    <div className="dashboard-container">
      <h2>Nurse Dashboard</h2>
      
      <div>
      <h3>Today's Appointments</h3>
      <table className="appointments-table">

        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>User Info</th>
            <th>Doctor Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
             
              <tr key={appointment._id}>
                <td>{appointment._id}</td>
                <td>{appointment.userInfo}</td>
                <td>{appointment.doctorInfo}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.paid ? "Paid":"Not Yet Paid"}</td>
                <td>
                  <button onClick={() => handleAppointmentClick(appointment)}>View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No appointments scheduled for today.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && selectedAppointment && (
        <AppointmentModal
          userId={selectedAppointment.userId} // Assuming userInfo is the userId
          appointmentId={selectedAppointment._id}
          comments={selectedAppointment.comments} // You can use status as placeholder
          onClose={handleModalClose}
          onUpdate={(updatedComments) => {
            // Logic to update the comments in the table if necessary
            const updatedAppointments = appointments.map((appointment) =>
              appointment._id === selectedAppointment._id
                ? { ...appointment, status: updatedComments }
                : appointment
            );
            setAppointments(updatedAppointments);
          }}
        />
      )}
    </div>
    </div>
    </div>
  );
};

export default NurseDashboard;
