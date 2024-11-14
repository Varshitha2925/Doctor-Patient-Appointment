// src/components/DoctorDashboard.tsx
import React, { useState } from 'react';
import DoctorAppointments from './DoctorAppointments';
import DoctorAvailability from './DoctorAvailability';
import './DoctorDashboard.css';
import DoctorProfile from './DoctorProfile';
import { Appointment, Doctor, PatientRecord } from './types';

const DoctorDashboard: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor>({
    id: 'DOC001',
    name: 'Dr. Sarah Connor',
    specialization: 'Cardiology',
    consultationFee: 200,
    availability: [
      { day: 'Monday', timeSlots: ['09:00 AM - 12:00 PM'] },
      { day: 'Wednesday', timeSlots: ['10:00 AM - 01:00 PM'] },
    ],
  });

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 'APP1001', patientName: 'John Doe', date: '2024-11-15', time: '09:30 AM', status: 'Pending', medicalHistory: 'No known allergies' },
    { id: 'APP1002', patientName: 'Jane Smith', date: '2024-11-15', time: '02:00 PM', status: 'Accepted', medicalHistory: 'Diabetes Type 2' },
  ]);

  const patientRecords: PatientRecord[] = appointments.map((app) => ({
    patientName: app.patientName,
    medicalHistory: app.medicalHistory,
  }));

  const handleAcceptAppointment = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === appointmentId ? { ...app, status: 'Accepted' } : app))
    );
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === appointmentId ? { ...app, status: 'Cancelled' } : app))
    );
  };

  const handleProfileUpdate = (updatedDoctor: Doctor) => setDoctor(updatedDoctor);

  return (
    <div className="doctor-dashboard">
      <DoctorProfile doctor={doctor} onUpdate={handleProfileUpdate} />
      <DoctorAvailability />
      <DoctorAppointments
        appointments={appointments}
        onAccept={handleAcceptAppointment}
        onCancel={handleCancelAppointment}
      />
    </div>
  );
};

export default DoctorDashboard;
