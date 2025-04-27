import { Link } from 'react-router-dom';
import { FaUserPlus, FaUserEdit, FaUsers } from 'react-icons/fa';

function Home() {
  return (
    <div className="home">
      <h1 className="home-title">Welcome to Student Management System</h1>
      <div className="home-cards">
        <Link to="/add-student" className="home-card">
          <FaUserPlus className="home-card-icon" />
          <span>Add Students</span>
        </Link>
        <Link to="/students" className="home-card">
          <FaUserEdit className="home-card-icon" />
          <span>Edit Students</span>
        </Link>
        <Link to="/students" className="home-card">
          <FaUsers className="home-card-icon" />
          <span>View Students</span>
        </Link>
      </div>
    </div>
  );
}

export default Home;
