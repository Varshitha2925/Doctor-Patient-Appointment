// src/types.ts

import { ReactNode } from "react";

export interface Doctor {
    userId: String;
    firstName:  String;
    lastName: String
    phone: String
    email:String
    website: String
    address: String;
    specialization: ReactNode;
    experience: String;
    feesPerCunsaltation: Number;
    status: String;
    timings: ReactNode;
  }
  
  export interface Appointment {
    appointmentId: String;
    userInfo: String;
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
  