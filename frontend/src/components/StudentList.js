import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      setStudents(res.data);
    } catch (err) {
      toast.error('Error deleting student');
    }
  };

  const deleteStudent = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      toast.success('Student deleted successfully!');
      fetchStudents(); // Refresh list
    } catch (err) {
      toast.error('Error deleting student');
    }
  };

  return (
    <div className="student-list">
      <h2 className="student-list-title">Student Details</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.department}</td>
              <td>{student.isActive ? 'Active' : 'Inactive'}</td>
              <td className="actions">
                <Link to={`/edit-student/${student._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => deleteStudent(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-student-btn-centered">
        <Link to="/add-student">
          <button>Add New Student</button>
        </Link>
      </div>
    </div>
  );
}

export default StudentList;
