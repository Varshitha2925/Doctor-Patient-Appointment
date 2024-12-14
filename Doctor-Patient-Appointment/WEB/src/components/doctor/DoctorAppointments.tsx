// src/components/DoctorAppointments.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DoctorAppointments.css';
import { Appointment } from './types';


const DoctorAppointments: React.FC = ({ }) => {
  const [appointment, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [medication, setmedication] = useState('Sleep')
  const [appointmentid , setappointmentid] = useState('')
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

    setPopupVisible(true);
    setappointmentid(appointmentid)
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
  const postMedication =async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/doctor/medication`,{
        "appointmentid":appointmentid,
        "medication": medication
      });
      // setAppointments(response.data.data);
      setappointmentid('')
      setmedication('')
      setPopupVisible(false);
      console.log("DATA:\n",response.data.data)
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }
  const handlePopupClose = () => setPopupVisible(false);
  return (
    <div className="appointments-section">
      <h3>Appointments</h3>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Prescription</th>
            {/* <th>Status</th>
            <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          
          {appointment.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.userInfo}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td><button onClick={() => onAccept(appointment._id)}>Medication</button></td>
              
              {/* <td>{appointment.status}</td> */}
              {/* <td> */}
                
                  {/* <button onClick={() => onAccept(appointment.id)}>Accept{appointment.id}</button> */}
                {/* {appointment.status === 'pending' && (
                  <>
                    <button onClick={() => onAccept(appointment._id)}>Accept</button>
                  </>
                )} */}
                {/* {appointment.status === 'approved' && (
                  <button onClick={() => onCancel(appointment._id)}>Cancel</button>
                )} */}
              {/* </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupVisible && (
        <div className="popup-overlay" onClick={handlePopupClose}>
          <div
            className="popup-container"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
          >
            <h2>Medication</h2>
            <input type= "text" value={medication} onChange={(e)=>setmedication(e.target.value)}>{}</input>
            
            <button className="close-popup-button" onClick={handlePopupClose}>
              Close
            </button>
            <button className="close-popup-button" onClick={postMedication}>
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
