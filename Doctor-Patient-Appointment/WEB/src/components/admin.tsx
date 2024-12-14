import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

interface User {
  id: string;
  username: string;
  email: string;
}

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'doctors'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchDoctors();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/getAllUsers');
      setUsers(response.data.data);
      console.log("USERS", response.data.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/getAllDoctors');
      setDoctors(response.data.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleApproveDoctor = async (doctorId: string) => {
    try {
      const status = "approved"
      await axios.post('http://localhost:3000/api/admin/changeAccountStatus', { doctorId , status});
    //   fetchDoctors(); // Refresh the doctor list
      alert('Doctor approved successfully.');
    } catch (error) {
      console.error('Error approving doctor:', error);
    }
    fetchDoctors()
  };
  const removeDoctor = async (doctorId: string) => {
    try {
      const status = "approved"
      await axios.delete(`http://localhost:3000/api/admin//deleteDoctor/${doctorId}`);
    //   fetchDoctors(); // Refresh the doctor list
      alert('Doctor approved successfully.');
    } catch (error) {
      console.error('Error approving doctor:', error);
    }
    fetchDoctors()
  };
  const navigate = useNavigate();
  const logOut = () => {
    navigate('/')
  }


  return (
   
    <div className="admin-dashboard">
      <button onClick={logOut} className="logout-btn">Log Out</button>
      <h1>Admin Dashboard</h1>
      <div className="tabs">
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Manage Users
        </button>
        <button
          className={activeTab === 'doctors' ? 'active' : ''}
          onClick={() => setActiveTab('doctors')}
        >
          Manage Doctors
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'users' && (
          <div>
            <h2>Users</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div>
            <h2>Doctors</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>{doctor._id}</td>
                    <td>{`${doctor.firstName} ${doctor.lastName}`}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.status}</td>
                    <td>
                      {doctor.status === 'pending' && (
                        <button onClick={() => handleApproveDoctor(doctor._id)}>
                          Approve
                        </button>
                      )}
                      {doctor.status === 'approved' && (
                        <button onClick={() => removeDoctor(doctor._id)}>
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
