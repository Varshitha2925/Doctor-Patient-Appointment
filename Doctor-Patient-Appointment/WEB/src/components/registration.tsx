import React, { useState } from "react";

interface Patient {
  username: string;
  email: string;
  password: string;
}

interface Doctor {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  specialization: string[];
  experience: string;
  feesPerConsultation: number;
  timings: string[];
}

const RegistrationPage: React.FC = () => {
  const [userType, setUserType] = useState<string>("patient");
  const [formData, setFormData] = useState<Partial<Patient & Doctor>>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "feesPerConsultation" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data: ", formData);
  };

  return (
    <div style={styles.container}>
      <h2 >Register</h2>
      <select
        name="userType"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        style={styles.select}
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      <form onSubmit={handleSubmit} style={styles.form}>
        {userType === "patient" && (
          <>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username || ""}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </>
        )}

        {userType === "doctor" && (
          <>
            <label style={styles.label}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <label style={styles.label}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <label style={styles.label}>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <label style={styles.label}>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <label style={styles.label}>Specialization (comma-separated)</label>
            <textarea
              name="specialization"
              value={formData.specialization?.join(", ") || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  specialization: e.target.value.split(",").map((s) => s.trim()),
                }))
              }
              style={styles.input}
            />
            <label style={styles.label}>Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience || ""}
              onChange={handleInputChange}
              style={styles.input}
            />
            <label style={styles.label}>Fees Per Consultation</label>
            <input
              type="number"
              name="feesPerConsultation"
              value={formData.feesPerConsultation || ""}
              onChange={handleInputChange}
              style={styles.input}
            />
            <label style={styles.label}>Timings (comma-separated)</label>
            <textarea
              name="timings"
              value={formData.timings?.join(", ") || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  timings: e.target.value.split(",").map((t) => t.trim()),
                }))
              }
              style={styles.input}
            />
          </>
        )}
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    background: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
  },
  formGroup: {
    marginBottom: "10px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold" as const,
    color: "#555",
  },
  input: {
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  select: {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default RegistrationPage;
