// src/types.ts

export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    consultationFee: number;
    availability: Array<{ day: string; timeSlots: string[] }>;
  }
  
  export interface Appointment {
    id: string;
    patientName: string;
    date: string;
    time: string;
    status: 'Pending' | 'Accepted' | 'Cancelled';
    medicalHistory: string;
  }
  
  export interface PatientRecord {
    patientName: string;
    medicalHistory: string;
  }
  