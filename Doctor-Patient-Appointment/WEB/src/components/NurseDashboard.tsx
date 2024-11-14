import React, { useState } from 'react';
import './NurseDashboard.css';

interface Appointment {
  appointmentId: string;
  patientName: string;
  status: string;
  assignedDoctor?: string;
}

const NurseDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { appointmentId: 'APP1001', patientName: 'John Doe', status: 'Pending' },
    { appointmentId: 'APP1002', patientName: 'Jane Smith', status: 'Pending' },
  ]);

  const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Brown'];
  const [selectedDoctors, setSelectedDoctors] = useState<{ [key: string]: string }>({});

  const handleAssignDoctor = (appointmentId: string) => {
    const doctor = selectedDoctors[appointmentId];
    if (!doctor) {
      alert('Please select a doctor');
      return;
    }

    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.appointmentId === appointmentId
          ? { ...appointment, assignedDoctor: doctor, status: 'Assigned' }
          : appointment
      )
    );

    alert(`Assigned ${doctor} to appointment ${appointmentId}`);
  };

  const handleDoctorSelection = (appointmentId: string, doctor: string) => {
    setSelectedDoctors((prevSelectedDoctors) => ({
      ...prevSelectedDoctors,
      [appointmentId]: doctor,
    }));
  };

  return (
    <div className="nurse-dashboard">
      <h2>Nurse Dashboard</h2>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Status</th>
            <th>Assign Doctor</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.appointmentId}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.status}</td>
              <td>
                <select
                  className="select-doctor"
                  value={selectedDoctors[appointment.appointmentId] || ''}
                  onChange={(e) => handleDoctorSelection(appointment.appointmentId, e.target.value)}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button className="assign-button" onClick={() => handleAssignDoctor(appointment.appointmentId)}>
                  Assign Doctor
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NurseDashboard;
