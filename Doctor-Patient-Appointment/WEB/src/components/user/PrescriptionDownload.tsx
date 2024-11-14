// src/components/PrescriptionDownload.tsx
import React, { useState } from 'react';
import { Prescription } from './types';

const PrescriptionDownload: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  const handleDownload = (prescription: Prescription) => {
    console.log("Downloading prescription:", prescription.id);
    // API call to download prescription
  };

  return (
    <div>
      <h2>Prescriptions</h2>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription.id}>
            Prescription #{prescription.id} 
            <button onClick={() => handleDownload(prescription)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionDownload;
