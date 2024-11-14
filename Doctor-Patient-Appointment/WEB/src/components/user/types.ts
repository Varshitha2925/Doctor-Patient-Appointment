// src/components/types.ts
export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    availableSlots: string[];
  }
  
  export interface Appointment {
    id: string;
    doctorId: string;
    date: string;
    type: "physical" | "virtual";
    status: "booked" | "cancelled" | "completed";
  }
  
  export interface Prescription {
    id: string;
    appointmentId: string;
    details: string;
  }
  