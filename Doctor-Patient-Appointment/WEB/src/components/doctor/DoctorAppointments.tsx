// src/components/DoctorAppointments.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DoctorAppointments.css';
import { Appointment } from './types';


const DoctorAppointments: React.FC = ({ }) => {
  const [appointment, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
  fetchAppointments();
  }, []);
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/doctor/doctor-appointments`);
      setAppointments(response.data.data);
      console.log("DATA:\n",response.data.data)
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };
  const onAccept = async(appointmentid:any) => {
    const status = "approved"
    try {
      const response = await axios.post(`http://localhost:3000/api/doctor/update-status`,{
        appointmentid,
        status
      });
      // setAppointments(response.data.data);
      console.log("DATA:\n",response.data.data)
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
    fetchAppointments();

  }
  const onCancel= async(appointmentid:any) => {
    const status = "cancelled"
    console.log("STATUS",appointmentid)
    try {
      const response = await axios.post(`http://localhost:3000/api/doctor/update-status`,{
        "appointmentid":appointmentid,
        "status":status
      });
      // setAppointments(response.data.data);
      console.log("DATA:\n",response.data.data)
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
    fetchAppointments();
  }
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
          
          {appointment.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.userInfo}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
              <td>
                
                  {/* <button onClick={() => onAccept(appointment.id)}>Accept{appointment.id}</button> */}
                {appointment.status === 'pending' && (
                  <>
                    <button onClick={() => onAccept(appointment._id)}>Accept</button>
                    {/* <button onClick={() => onCancel(appointment.id)}>Cancel</button> */}
                  </>
                )}
                {appointment.status === 'approved' && (
                  <button onClick={() => onCancel(appointment._id)}>Cancel</button>
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
