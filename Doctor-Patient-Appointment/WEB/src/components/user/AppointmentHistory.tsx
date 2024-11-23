// src/components/AppointmentHistory.tsx
import axios from 'axios';
import React, { ReactNode, useEffect, useState } from 'react';
import './AppointmentHistory.css';

interface Appointment {
  doctorInfo: ReactNode;
  prescription: any;
  type: ReactNode;
  time: ReactNode;
  appointmentId: any;
  id: string;
  doctorName: string;
  date: string;
  status: string;
  prescriptionAvailable: boolean;
}

const AppointmentHistory: React.FC = () => {
  // Sample data (ideally fetched from the backend)
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // // const response = axios.get(`http://localhost:3000/api/users/user-appointments`);
  // axios.get('http://localhost:3000/api/users/user-appointments')
  // .then((response) => {
  //   console.log(response.data); // Extracted data from the response
  // })
  // .catch((error) => {
  //   console.error('Error fetching data:', error);
  // });
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/user-appointments`);
        setAppointments(response.data.data);
        console.log("DATA:\n",response.data.data)
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };fetchAppointments();
  }, []);
      
  // const appointments: Appointment[] = [
  //   { id: 'APP001', doctorName: 'Dr. Smith', date: '2023-12-10', status: 'Completed', prescriptionAvailable: true },
  //   { id: 'APP002', doctorName: 'Dr. Johnson', date: '2023-12-11', status: 'Scheduled', prescriptionAvailable: false },
  //   { id: 'APP003', doctorName: 'Dr. Brown', date: '2023-12-12', status: 'Cancelled', prescriptionAvailable: false },
  // ];

  const handleReschedule = (appointmentId: string) => {
    console.log(`Rescheduling appointment: ${appointmentId}`);
  };

  const handleCancel = async (appointmentId: string) => {
    console.log("AAP",appointmentId)
    try {
      const response = await axios.delete(`http://localhost:3000/api/users/appointment/${appointmentId}`);
      setAppointments(response.data.data);
      console.log("DATA:\n",response.data.data)
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
    console.log(`Cancelling appointment: ${appointmentId}`);
  };

  const handleDownloadPrescription = (appointmentId: string) => {
    console.log(`Downloading prescription for appointment: ${appointmentId}`);
  };

  console.log("Appointments",appointments)

  return (
    <div className="appointment-history">
      <h3>Appointment History</h3>
      <table>
        <thead>
        <tr>
            <th>Doctor Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
            <th>Status</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.doctorInfo}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>
                <button onClick={() => handleReschedule(appointment.appointmentId)}>Reschedule</button>
                <button onClick={() => handleCancel(appointment.appointmentId)}>Cancel</button>
                </td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.prescription ? (
                    <a href={appointment.prescription} download>
                      Download
                    </a>
                  ) : (
                    'Not Available'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentHistory;
