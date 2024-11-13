import React, { FormEvent, useState } from 'react';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username === "user" && password === "password") {
      setMessage("Login successful!");
    } else {
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container" >
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
        type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        ></input>

        <label htmlFor="password">Password</label>
        <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />

        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
