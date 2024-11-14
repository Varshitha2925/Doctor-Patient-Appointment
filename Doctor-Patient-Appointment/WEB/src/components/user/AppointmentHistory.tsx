// src/components/AppointmentHistory.tsx
import React from 'react';
import './AppointmentHistory.css';

interface Appointment {
  id: string;
  doctorName: string;
  date: string;
  status: string;
  prescriptionAvailable: boolean;
}

const AppointmentHistory: React.FC = () => {
  // Sample data (ideally fetched from the backend)
  const appointments: Appointment[] = [
    { id: 'APP001', doctorName: 'Dr. Smith', date: '2023-12-10', status: 'Completed', prescriptionAvailable: true },
    { id: 'APP002', doctorName: 'Dr. Johnson', date: '2023-12-11', status: 'Scheduled', prescriptionAvailable: false },
    { id: 'APP003', doctorName: 'Dr. Brown', date: '2023-12-12', status: 'Cancelled', prescriptionAvailable: false },
  ];

  const handleReschedule = (id: string) => {
    console.log(`Rescheduling appointment: ${id}`);
  };

  const handleCancel = (id: string) => {
    console.log(`Cancelling appointment: ${id}`);
  };

  const handleDownloadPrescription = (id: string) => {
    console.log(`Downloading prescription for appointment: ${id}`);
  };

  return (
    <div className="appointment-history">
      <h3>Appointment History</h3>
      <table>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.doctorName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.status}</td>
              <td>
                <button onClick={() => handleReschedule(appointment.id)}>Reschedule</button>
                <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
              </td>
              <td>
                {appointment.status === 'Completed' && appointment.prescriptionAvailable ? (
                  <button onClick={() => handleDownloadPrescription(appointment.id)}>Download</button>
                ) : (
                  <span>N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentHistory;
