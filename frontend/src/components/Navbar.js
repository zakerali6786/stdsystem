// components/Navbar.js
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Student Management</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/add-student">Add Student</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;