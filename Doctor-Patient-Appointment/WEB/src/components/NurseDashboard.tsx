import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";

interface Appointment {
  doctorInfo: ReactNode;
  prescription: any;
  type: ReactNode;
  time: ReactNode;
  appointmentId: any;
  id: string;
  doctorName: string;
  userInfo:string;
  date: string;
  status: string;
  prescriptionAvailable: boolean;
}

interface Doctor {
  doctorId: string;
  firstName: string;
}

const NurseDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<{ [key: string]: string }>({}); // Tracks selected doctor for each appointment
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch appointments and doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, doctorsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/users/user-appointments"),
          axios.get("http://localhost:3000/api/users/getAllDoctors"),
        ]);
        setAppointments(appointmentsRes.data.data);
        setDoctors(doctorsRes.data.data);
        console.log("doctors", doctorsRes.data.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle doctor assignment
  const handleAssignDoctor = async (appointmentId: string) => {
    const doctorId = selectedDoctor[appointmentId];
    if (!doctorId) {
      alert("Please select a doctor!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/assign-doctor", {
        appointmentId,
        doctorId,
      });
      setSuccessMessage(response.data.message);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.appointmentId === appointmentId
            ? { ...appointment, doctorName: doctors.find((d) => d.doctorId === doctorId)?.doctorId || "Unknown" }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error assigning doctor:", error);
    }
  };

  const handleDoctorChange = (appointmentId: string, doctorId: string) => {
    setSelectedDoctor((prev) => ({
      ...prev,
      [appointmentId]: doctorId,
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nurse Dashboard</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th >Appointment ID</th>
            <th >Patient Name</th>
            <th >Doctor Name</th>
            <th >Date</th>
            <th >Time</th>
            <th >Assign Doctor</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td style={styles.tableCell}>{appointment.appointmentId}</td>
              <td style={styles.tableCell}>{appointment.userInfo}</td>
              <td style={styles.tableCell}>{appointment.doctorInfo || "Not Assigned"}</td>
              <td style={styles.tableCell}>{appointment.date}</td>
              <td style={styles.tableCell}>{appointment.time}</td>
              <td style={styles.tableCell}>
                <select
                  value={selectedDoctor[appointment.appointmentId] || ""}
                  onChange={(e) => handleDoctorChange(appointment.appointmentId, e.target.value)}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.doctorId} value={doctor.doctorId}>
                      {doctor.firstName}
                    </option>
                  ))}
                </select>
              </td>
              <td style={styles.tableCell}>
                <button onClick={() => handleAssignDoctor(appointment.appointmentId)}>Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableHeader: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f4f4f4",
    textAlign: "left",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "8px",
  },
};

export default NurseDashboard;
