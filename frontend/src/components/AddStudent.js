import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

function AddStudent() {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    dob: '',
    department: 'Computer Science',
    enrollmentYear: new Date().getFullYear(),
    isActive: true
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/students', formData);
      toast.success('Student added successfully!');
      navigate('/students');
    } catch (err) {
      toast.error('Error adding student');
    }
  };

  return (
    <div className="add-student">
      <h2 className="add-student-title">Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="studentId" placeholder="Student ID" onChange={handleChange} required />
        <input name="name" placeholder="Name" onChange={handleChange} required minLength="2" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="date" name="dob" onChange={handleChange} required />
        <select name="department" onChange={handleChange} required>
          <option value="Computer Science">Computer Science</option>
          <option value="Electrical">Electrical</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
        </select>
        <input type="number" name="enrollmentYear" placeholder="Enrollment Year" 
               onChange={handleChange} required min="2000" max={new Date().getFullYear()} />
        <div className="checkbox-row">
          <input type="checkbox" name="isActive" checked={formData.isActive} 
                 onChange={(e) => setFormData({...formData, isActive: e.target.checked})} />
          <span>Active Enrollment</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button type="submit">Add Student</button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
