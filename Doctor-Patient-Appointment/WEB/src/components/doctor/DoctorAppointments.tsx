// src/components/DoctorAppointments.tsx
import React from 'react';
import './DoctorAppointments.css';
import { Appointment } from './types';

interface DoctorAppointmentsProps {
  appointments: Appointment[];
  onAccept: (appointmentId: string) => void;
  onCancel: (appointmentId: string) => void;
}

const DoctorAppointments: React.FC<DoctorAppointmentsProps> = ({ appointments, onAccept, onCancel }) => {
  return (
    <div className="appointments-section">
      <h3>Appointments</h3>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
              <td>
                {appointment.status === 'Pending' && (
                  <>
                    <button onClick={() => onAccept(appointment.id)}>Accept</button>
                    <button onClick={() => onCancel(appointment.id)}>Cancel</button>
                  </>
                )}
                {appointment.status === 'Accepted' && (
                  <button onClick={() => onCancel(appointment.id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorAppointments;
