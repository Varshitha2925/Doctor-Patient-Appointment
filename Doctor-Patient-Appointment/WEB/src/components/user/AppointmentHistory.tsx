// src/components/AppointmentHistory.tsx
import axios from 'axios';
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentHistory.css';


interface Appointment {
  paid: any;
  medication: any;
  doctorId: ReactNode;
  doctorInfo: ReactNode;
  prescription: any;
  type: ReactNode;
  time: any;
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
  const [time, settime] = useState<boolean>()

  const userId = localStorage.getItem("userId");
  console.log("USERID",userId)
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

  const handleReschedule = async (appointmentId: string) => {
    console.log(`Rescheduling appointment: ${appointmentId}`);
    try {
      const response = await axios.post(`http://localhost:3000/api/users/reschedule`,{
        appointmentId,
        time
      });
      setAppointments(response.data.data);
      console.log("DATA:\n",response.data.data)
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
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

  const handleDownloadPrescription = async (appointmentId: string) => {
    
      try {
        const response = await axios.get(`http://localhost:3000/api/doctor/medication/${appointmentId}`);
        // setAppointments(response.data.data);

        
        // setPopupVisible(false);
        console.log("DATA:\n",response.data.data)
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    
  };
  const navigate = useNavigate();

  const handlepayment= async(appointmentId:any) => {
    console.log("appoint", appointmentId)
    navigate(`/payment/${appointmentId}`)
  }
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
            
            <th>Prescription</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.doctorId ? appointment.doctorId : "NA"}</td>
                <td>{appointment.date? appointment.date : "NA"}</td>
                <td>{appointment.time? appointment.time : "NA"}</td>
                <td>
                {/* <button onClick={() => handleReschedule(appointment.appointmentId)}>Reschedule</button> */}
                <button onClick={() => handleCancel(appointment.appointmentId)}>Cancel</button>
                </td>
                
                <td>
                  {appointment.medication ? appointment.medication:"NA"}
                </td>
                
                <button onClick={() => handlepayment(appointment.appointmentId)} disabled={appointment.paid}>Pay</button>
                
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
