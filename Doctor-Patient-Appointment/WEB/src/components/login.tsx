import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [email , setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [error, seterror] = useState<string>('')
  const navigate = useNavigate();

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Logging in as ${userType}:`, {
      email,
      password
    });
    
    if(userType === "patient"){
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
          email,
          password,
        });
        localStorage.setItem('userId', response.data.user._id);
  
        console.log("response",response)
        navigate('/dashboard');
        if (response.statusText === "OK") {
          console.log('Login successful');
           // Save token to local storage
          console.log('userId', response.data.user._id)
          navigate('/dashboard'); // Redirect to user/organizer dashboard
        } else {
          // setError(response.data.message || 'Login failed');
        }
      } catch (err: any) {

      }
    }
    else if(userType === "doctor"){
      try {
        const response = await axios.post('http://localhost:3000/api/doctor/login', {
          email,
          password,
        });
  
        console.log("response",response)
  
        if (response.statusText === "OK") {
          console.log('Login successful');
          localStorage.setItem('userId', response.data.user._id); // Save token to local storage
          navigate('/doctor-dashboard'); // Redirect to user/organizer dashboard
        } else {
          seterror('Admin has not approved yet....!')
          // setError(response.data.message || 'Login failed');
        }
      } catch (err: any) {
        console.error('Login error:', err);
      }
    
    }
    else if(userType === "nurse"){
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
          email,
          password,
        });

        console.log("response",response)

        if (response.statusText === "OK") {
          console.log('Login successful');
          localStorage.setItem('organizerId', response.data.user._id); // Save token to local storage
          if(response.data.status == "approved"){

          }
          else{
          navigate('/'); 
          }// Redirect to user/organizer dashboard
        } else {
          // setError(response.data.message || 'Login failed');
        }
      } catch (err: any) {
        // setError(err.response?.data?.message || 'An error occurred. Please try again.');
        // console.error('Login error:', err);
      }
    
    }
    else{
      navigate('/admin-dashboard');
    }
    
  };

  return (
    <div className="login-page" style={styles.container}>
      <h2>Login</h2>
      <select
          id="role"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          style={styles.select}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>
      <form className="login-form" onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="email" style={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          style={styles.input}
          required
        />

        <label htmlFor="password" style={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          style={styles.input}
          required
        />

        {error && <p className="error-message">{error}</p>}        

        <button type="submit" style={styles.button}>Login</button>
        
      </form>

      <p className="register-link" style = {styles.registerLink} >
        Don’t have an account?{' '}
        <a href="/register" onClick={() => navigate('/register')}>
          Register here
        </a>
      </p>

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
