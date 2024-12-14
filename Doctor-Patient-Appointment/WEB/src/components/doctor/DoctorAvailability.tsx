import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DoctorAvailability.css';

interface Slot {
  userId:string;
  date: string;
  startTime: string;
  endTime: string;
}

const DoctorAvailability: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [newSlot, setNewSlot] = useState<Slot>({
    userId:"",
    date: '',
    startTime: '',
    endTime: ''
  });
  const [time, settime] = useState<Slot>({
    userId:"",
    date: '',
    startTime: '',
    endTime: ''
  });

  useEffect(() => {
    getTimeSlot()
  }, []);

  const calculateEndTime = (start: string): string => {
    const [hours, minutes] = start.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    date.setMinutes(date.getMinutes() + 15);

    const endHours = date.getHours();
    const endMinutes = date.getMinutes();
    return `${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle input change for new slot data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSlot({ ...newSlot, [name]: value });
  };

  // console.log("New Slot" , newSlot)

  const userId = localStorage.getItem("userId");
  console.log('USER ID',userId)

  const getTimeSlot = async() =>{
    try {
      const response = await axios.get("http://localhost:3000/api/doctor/timeSlot");
      const timeSlots = response.data.data
      const doctorTimeSlots = timeSlots.filter((slot:any) => slot.userId === userId)
      // setSlots(response.data.data || []);
      const time = doctorTimeSlots[0]
      if(time){
        // console.log("Time" , time.time)
        setSlots(time.time);
      }
      console.log("Time Slots" , response.data.data)
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  }
  function convertTo12HourFormat(time24: string): string {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight and adjust other hours
    console.log("HOURS", adjustedHours)
    return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  }
  // Add new slot to the slots list
  const addSlot = async () => {
    console.log("NEWSLOT" , newSlot)
    settime({...time, date:newSlot.date})
    const endtime = calculateEndTime(newSlot.startTime)
    console.log("endtime",endtime)
    const start = convertTo12HourFormat(newSlot.startTime)
    const end = convertTo12HourFormat(endtime)
    console.log("TIMES", {start,end})
    const date = newSlot.date

    settime({ ...time, endTime: end });
    settime({ ...time, startTime: start });
    
    postSlot(date , start , end)
  };
  const postSlot = async (date: any , start:any, end:any) => {
    console.log("TIMES", {date, start , end})
    if (date && start && end) {
      console.log("time",time.date)
      try {
        const response = await axios.post(
          'http://localhost:3000/api/doctor/timeSlot',
          {
            userId: userId,
            time:{
              date: date,
              startTime: start,
              endTime: end
            }
          }
        );
        console.log(response.data.data.time)
        
       
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
     
    } else {
      alert('Please fill in all fields');
    }
  }

  // Remove slot from the list
  const removeSlot = (index: number) => {
    const updatedSlots = slots.filter((_, i) => i !== index);
    setSlots(updatedSlots);
  };

  return (
    <div className="availability-section">
      <h3>Set Availability Slots</h3>

      {/* Form to add new slot */}
      <div className="slot-input">
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={newSlot.date}
          onChange={handleInputChange}
        />
        <label>Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={newSlot.startTime}
          onChange={handleInputChange}
        />
        {/* <label>End Time:</label>
        <input
          type="time"
          name="endTime"
          value={newSlot.endTime}
          onChange={handleInputChange}
        /> */}
        <button onClick={addSlot}>Add Slot</button>
      </div>

      {/* List of added slots */}
      <div className="slots-list">
        <h4>Available Slots</h4>
        {slots.length > 0 ? (
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
              {slots.map((slot, index) => (
                <tr key={index}>
                  <td>{slot.date}</td>
                  <td>{slot.startTime}</td>
                  <td>{slot.endTime}</td>
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
  );
};

export default DoctorAvailability;
