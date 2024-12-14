import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Patient {
  username: string;
  email: string;
  password: string;
}

interface Doctor {
  firstName: string;
  lastName: string;
  password: string,
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
  const [formData, setFormData] = useState<Doctor>({
  firstName: "",
  lastName: "",
  password: "",
  phone: "",
  email: "",
  address: "",
  specialization: [],
  experience: "",
  feesPerConsultation: 0,
  timings: [],
  });

  const [username, setusername] = useState<string>();
  const [email, setemail] = useState<string>();
  const [password, setpassword] = useState<string>();
  const [city, setcity] = useState<string>();
  const [state, setstate] = useState<string>();
  const [zipcode, setzipcode] = useState<string>();
  const [insuarance, setinsuarance] = useState<string>();

  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "feesPerConsultation" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(userType == "patient"){
      await axios.post(`http://localhost:3000/api/users/register`, {
        username,
        email,
        password,
        city,
        state,
        zipcode,
        insuarance
      })
    console.log("Submitted Data: ", formData);
    navigate('/');
    }
    else{
      const response = await axios.post(`http://localhost:3000/api/users/apply-doctor`, formData)
      console.log("response", response)
      navigate('/');
    }
    
    
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
              value={username || ""}
              onChange={(e)=>{setusername(e.target.value)}}
              style={styles.input}
              required
            />
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={email || ""}
              onChange={(e)=>{setemail(e.target.value)}}
              style={styles.input}
              required
            />
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={password || ""}
              onChange={(e)=>{setpassword(e.target.value)}}
              style={styles.input}
              required
            />
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="password"
              value={password || ""}
              onChange={(e)=>{setpassword(e.target.value)}}
              style={styles.input}
              required
            />
            <label style={styles.label}>City</label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e)=>{setcity(e.target.value)}}
              style={styles.input}
              required
            />
            <label style={styles.label}>State</label>
            <input
              type="text"
              name="state"
              value={state || ""}
              onChange={(e)=>{setstate(e.target.value)}}
              style={styles.input}
              required
            />
            <label style={styles.label}>Zip Code</label>
            <input
              type="text"
              name="zipcode"
              value={zipcode || ""}
              onChange={(e)=>{setzipcode(e.target.value)}}
              style={styles.input}
              required
            />
            <label style={styles.label}>Insuarance</label>
            <input
              type="text"
              name="insuarance"
              value={insuarance || ""}
              onChange={(e)=>{setinsuarance(e.target.value)}}
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
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              style={styles.input}
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
