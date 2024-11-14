// src/components/DoctorSearch.tsx
import React, { useState } from 'react';
import { Doctor } from './types';

const DoctorSearch: React.FC = () => {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const handleSearch = () => {
    console.log("Searching doctors:", search, specialty);
    // API call to fetch doctors based on search and specialty
  };

  return (
    <div>
      <h2>Search Doctors</h2>
      <input 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Search doctor by name" 
      />
      <input 
        type="text" 
        value={specialty} 
        onChange={(e) => setSpecialty(e.target.value)} 
        placeholder="Specialty" 
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>{doctor.name} - {doctor.specialty}</li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorSearch;
