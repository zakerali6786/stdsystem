import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

function EditStudent() {
  const { id } = useParams();
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

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/students/${id}`);
      setFormData({
        ...res.data,
        dob: res.data.dob ? res.data.dob.substring(0, 10) : ''
      });
    } catch (err) {
      toast.error('Error fetching student');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setFormData({ ...formData, isActive: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/students/${id}`, formData);
      toast.success('Student updated successfully!');
      navigate('/students');
    } catch (err) {
      toast.error('Error updating student');
    }
  };

  return (
    <div className="edit-student">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="studentId" placeholder="Student ID" value={formData.studentId} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required minLength="2" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <select name="department" value={formData.department} onChange={handleChange} required>
          <option value="Computer Science">Computer Science</option>
          <option value="Electrical">Electrical</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
        </select>
        <input type="number" name="enrollmentYear" placeholder="Enrollment Year" value={formData.enrollmentYear} onChange={handleChange} required min="2000" max={new Date().getFullYear()} />
        <div className="checkbox-row">
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleCheckbox} />
          <span>Active Enrollment</span>
        </div>
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}

export default EditStudent;
