import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";

interface BookAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Appointment {
  doctorInfo: React.ReactNode;
  prescription: any;
  type: React.ReactNode;
  time: React.ReactNode;
  appointmentId: string;
  id: string;
  doctorName: string;
  userId:string;
  userInfo: string;
  doctorId: string;
  date: string;
  status: string;
  prescriptionAvailable: boolean;
}

interface Doctor {
  userId: string;
  doctorId: string;
  firstName: string;
}

interface TimeSlot {
  endTime: any;
  startTime: any;
  date: any;
  time: any;
  userId: string;
  // doctorId: string;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({ isOpen, onClose }) => {
  const [userInfo, setUserInfo] = useState("John Doe"); // Replace with actual user info
  const [breif, setbreif] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [filteredTimeSlots, setFilteredTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [did,setdid] = useState<string>()
  // const [doctorInfo,setdoctorInfo] = useState<string>()

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, doctorsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/users/nurse-appointments"),
          axios.get("http://localhost:3000/api/users/getAllDoctors"),
        ]);

        setAppointments(appointmentsRes.data.data);
        setDoctors(doctorsRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    fetchDoctorTimeSlots();
  }, []);

  const fetchDoctorTimeSlots = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/doctor/timeSlot");
      setTimeSlots(response.data.data || []);
      console.log("Time Slots" , response.data.data)
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  const handleDoctorChange = (doctorId: string) => {
    setFilteredTimeSlots([])
    // setdoctorInfo(doctorId)
    
    // console.log("DOCTORID",doctorId)
    // Filter time slots for the selected doctor
    const doctorID = doctors.filter((slot) => slot.firstName === doctorId)[0]
    setdid(doctorID.userId)
    // console.log("FILTERED DOCTOR INFO", doctorID)
    const doctorTimeSlots = timeSlots.filter((slot) => slot.userId === doctorID.userId)
    setSelectedDoctor(doctorId);
    // console.log("DOCTOR ID", doctorTimeSlots)
    const time = doctorTimeSlots[0]
    if(time){
      // console.log("Time" , time.time)
      setFilteredTimeSlots(time.time);
    }
    
    setSelectedTimeSlot(""); // Reset selected time slot
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedTimeSlot) {
      alert("Please select a doctor and a time slot.");
      return;
    }

    const appointmentData = {
      userId : localStorage.getItem("userId"),
      breif,
      timeSlot: selectedTimeSlot,
      doctorInfo: selectedDoctor,
      did
    };
    console.log("APPOINT", appointmentData)


    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/book-appointment`,
        appointmentData
      );
      console.log("response",response)
      // setSuccessMessage(response.data.message);
      // setErrorMessage(null);
    } catch (error) {
      // setErrorMessage("Failed to create appointment. Please try again.");
      // setSuccessMessage(null);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Book an Appointment</h3>
        <form onSubmit={handleSubmit}>
          {/* <label>
            Patient Info:
            <input
              type="text"
              value={userInfo}
              onChange={(e) => setUserInfo(e.target.value)}
            />
          </label> */}

          <label>
            Doctor:
            <select
              value={selectedDoctor}
              onChange={(e) => handleDoctorChange(e.target.value)}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor.firstName}
                </option>
              ))}
            </select>
          </label>

          {filteredTimeSlots.length > 0 ? (
              <label>
              Time Slot:
              <select
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                required
              >
                <option value="">Select Time Slot</option>
                {filteredTimeSlots.map((slot, index) => (
                  <option key={index} value={`${slot.date} ${slot.startTime}-${slot.endTime}`}>
                    {`${slot.date} ${slot.startTime} - ${slot.endTime}`}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <p>Time Slots not available</p>
          )}


          <label>
            Brief:
            <input
              type="text"
              value={breif}
              onChange={(e) => setbreif(e.target.value)}
              required
            />
          </label>

          <button type="submit">Confirm Appointment</button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
