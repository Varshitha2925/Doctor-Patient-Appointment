import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Appointment {
  doctorInfo: React.ReactNode;
  prescription: any;
  type: React.ReactNode;
  time: React.ReactNode;
  appointmentId: string;
  id: string;
  doctorName: string;
  userInfo: string;
  doctorId: string;
  date: string;
  status: string;
  prescriptionAvailable: boolean;
}

interface Doctor {
  doctorId: string;
  firstName: string;
}

interface TimeSlot {
  date: string;
  starttime: string;
  endtime: string;
}

const NurseDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<{ [key: string]: string }>({});
  const [selectedDate, setSelectedDate] = useState<{ [key: string]: string }>({});
  const [selectedTime, setSelectedTime] = useState<{ [key: string]: string }>({});

  // Fetch appointments and doctors on mount

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, doctorsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/users/nurse-appointments"),
          axios.get("http://localhost:3000/api/users/getAllDoctors"),
        ]);
         
        setAppointments(appointmentsRes.data.data);
        console.log("data",appointmentsRes.data)
        setDoctors(doctorsRes.data.data);
      
       console.log
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    
    fetchDoctorTimeSlots();
  }, []);
  const appointmentsWithoutDoctor = appointments.filter(
    (appointment) => !appointment.doctorId
  );
  console.log("APPOINTMENTS" , appointmentsWithoutDoctor)

  // Fetch time slots for a doctor
  const fetchDoctorTimeSlots = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/doctor/timeSlot`
      );
      console.log("TimeSlots" ,response.data.data)
      setTimeSlots(response.data.data.time|| []);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  const handleDoctorChange = (doctorId: string, appointmentId: string) => {
    setSelectedDoctor((prev) => ({ ...prev, [appointmentId]: doctorId }));
    setSelectedDate((prev) => ({ ...prev, [appointmentId]: "" }));
    setSelectedTime((prev) => ({ ...prev, [appointmentId]: "" }));
    // fetchDoctorTimeSlots(doctorId, appointmentId);
  };

  const handleDateChange = (date: string, appointmentId: string) => {
    setSelectedDate((prev) => ({ ...prev, [appointmentId]: date }));
    setSelectedTime((prev) => ({ ...prev, [appointmentId]: "" }));
  };

  const handleTimeChange = (starttime: string, appointmentId: string) => {
    setSelectedTime((prev) => ({ ...prev, [appointmentId]: starttime }));
  };

  const handleAssignDoctor = async (appointmentId: string) => {
    const doctorId = selectedDoctor[appointmentId];
    const date = selectedDate[appointmentId];
    const starttime = selectedTime[appointmentId];

    if (!doctorId || !date || !starttime) {
      alert("Please select a doctor, date, and time!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/assign-doctor", {
        appointmentId,
        doctorId,
        date,
        starttime,
      });
      

      alert(`Doctor assigned successfully: ${response.data.message}`);
    } catch (error) {
      console.error("Error assigning doctor:", error);
    }
  };
  const logOut = () => {
    navigate('/')
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nurse Dashboard</h2>
      <button onClick={logOut} className="logout-btn">Log Out</button>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Appointments Card */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            width: "60%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>Appointments</h3>
          {appointmentsWithoutDoctor.map((appointment) => (
            <div
              key={appointment.appointmentId}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <p>
                <strong>Appointment ID:</strong> {appointment.appointmentId}
              </p>
              <p>
                <strong>Patient Name:</strong> {appointment.userInfo}
              </p>

              {/* Doctor Selection */}
              <div style={{ marginBottom: "10px" }}>
                <label>
                  <strong>Doctor:</strong>
                </label>
                <select
                  value={selectedDoctor[appointment.appointmentId] || ""}
                  onChange={(e) =>
                    handleDoctorChange(e.target.value, appointment.appointmentId)
                  }
                  style={{ marginLeft: "10px", padding: "5px" }}
                >
                  <option value="">--Select Doctor--</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.doctorId} value={doctor.doctorId}>
                      {doctor.firstName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Manual Date Selection */}
              <div style={{ marginBottom: "10px" }}>
                <label>
                  <strong>Date:</strong>
                </label>
                <input
                  type="date"
                  value={selectedDate[appointment.appointmentId] || ""}
                  onChange={(e) =>
                    handleDateChange(e.target.value, appointment.appointmentId)
                  }
                  style={{ marginLeft: "10px", padding: "5px" }}
                />
              </div>

              {/* Manual Time Selection */}
              <div style={{ marginBottom: "10px" }}>
                <label>
                  <strong>Time:</strong>
                </label>
                <input
                  type="time"
                  value={selectedTime[appointment.appointmentId] || ""}
                  onChange={(e) =>
                    handleTimeChange(e.target.value, appointment.appointmentId)
                  }
                  style={{ marginLeft: "10px", padding: "5px" }}
                />
              </div>

              {/* Assign Button */}
              <button onClick={() => handleAssignDoctor(appointment.appointmentId)}>
                Assign Doctor
              </button>
            </div>
          ))}
        </div>

        <div className="availability-section">
      <h3>Availability Slots</h3>

      {/* List of added slots */}
      <div className="slots-list">
        <h4>Available Slots</h4>
        {timeSlots.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, index) => (
                <tr key={index}>
                  <td>{slot.date}</td>
                  <td>{slot.starttime}</td>
                  <td>{slot.endtime}</td>
                  {/* <td>
                    <button onClick={() => removeSlot(index)}>Remove</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No slots added yet.</p>
        )}
      </div>
    </div>
      </div>
    </div>
  );
};

export default NurseDashboard;