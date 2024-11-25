import React, { useState } from "react";
import { Link } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [userType, setUserType] = useState<string>("patient");
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Logging in as ${userType}:`, formData);

    // Example: API call for login
    try {
      const response = await fetch(`http://localhost:3000/api/auth/login/${userType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login success:", result);
        // Handle login success (e.g., redirect or store token)
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <select
        name="userType"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        style={styles.select}
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="nurse">Nurse</option>
        <option value="admin">Admin</option>
      </select>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {/* Conditional "New user? Register" link */}
      {(userType === "patient" || userType === "doctor") && (
        <div style={styles.registerLink}>
          New user? <Link to="/register">Register here</Link>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
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
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  registerLink: {
    marginTop: "15px",
    textAlign: "center" as const,
    color: "#007bff",
  },
};

export default LoginPage;
