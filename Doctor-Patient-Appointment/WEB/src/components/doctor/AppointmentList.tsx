// src/components/AppointmentList.tsx
import React from 'react';
import './AppointmentList.css';

interface Appointment {
  appointmentId: string;
  patientName: string;
  date: string;
  time: string;
  status: string;
}

const appointments: Appointment[] = [
  {
    appointmentId: 'APP001',
    patientName: 'John Doe',
    date: '2023-10-20',
    time: '10:00 AM',
    status: 'Confirmed',
  },
  {
    appointmentId: 'APP002',
    patientName: 'Jane Smith',
    date: '2023-10-21',
    time: '02:00 PM',
    status: 'Pending',
  },
  {
    appointmentId: 'APP003',
    patientName: 'Tom Brown',
    date: '2023-10-22',
    time: '11:00 AM',
    status: 'Cancelled',
  },
];

const AppointmentList: React.FC = () => {
  const handleAccept = (id: string) => {
    console.log(`Accepted appointment: ${id}`);
  };

  const handleReschedule = (id: string) => {
    console.log(`Rescheduled appointment: ${id}`);
  };

  const handleCancel = (id: string) => {
    console.log(`Cancelled appointment: ${id}`);
  };

  return (
    <div className="appointment-list">
      <h2>Appointments</h2>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.appointmentId}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</td>
              <td>
                <button className="btn-accept" onClick={() => handleAccept(appointment.appointmentId)}>Accept</button>
                <button className="btn-reschedule" onClick={() => handleReschedule(appointment.appointmentId)}>Reschedule</button>
                <button className="btn-cancel" onClick={() => handleCancel(appointment.appointmentId)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
