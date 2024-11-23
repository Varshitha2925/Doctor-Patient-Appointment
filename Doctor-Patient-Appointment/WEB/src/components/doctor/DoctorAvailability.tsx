import React, { useState } from 'react';
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

  // Handle input change for new slot data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSlot({ ...newSlot, [name]: value });
  };

  // Add new slot to the slots list
  const addSlot = () => {
    if (newSlot.date && newSlot.startTime && newSlot.endTime) {
      setSlots([...slots, newSlot]);
      setNewSlot({ userId: '', date: '', startTime: '', endTime: '' }); // Clear the form
    } else {
      alert('Please fill in all fields');
    }
  };

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
        <label>End Time:</label>
        <input
          type="time"
          name="endTime"
          value={newSlot.endTime}
          onChange={handleInputChange}
        />
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, index) => (
                <tr key={index}>
                  <td>{slot.date}</td>
                  <td>{slot.startTime}</td>
                  <td>{slot.endTime}</td>
                  <td>
                    <button onClick={() => removeSlot(index)}>Remove</button>
                  </td>
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
