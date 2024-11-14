// src/components/ProfileManagement.tsx
import React, { useState } from 'react';

const ProfileManagement: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleProfileUpdate = () => {
    console.log("Updating profile:", name, email);
    // API call to update profile
  };

  return (
    <div>
      <h2>Profile Management</h2>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name" 
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <button onClick={handleProfileUpdate}>Update Profile</button>
    </div>
  );
};

export default ProfileManagement;
