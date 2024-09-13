import React from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the path as needed
import { FaCloud, FaNewspaper, FaFilm, FaMusic, FaPlane, FaCog, FaQuestionCircle, FaSignOutAlt, FaBars } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth(); // Get user and logout from context
  const username = user?.name || 'Guest';

  return (
    <aside className="sidebar">
      <div className="logo_section">
        <img src="https://via.placeholder.com/150" alt="News App" className="profile-pic" />
        <div className="logo-info">
          <h1 className="logo-name">News App</h1>
        </div>
        {/* Add Menu Icon */}
        <a href="/" className="menu-icon-link">
          <FaBars className="menu-icon" />
        </a>
      </div>
      
      <div className="profile">
        <img src="https://via.placeholder.com/150" alt="User Avatar" className="profile-pic" /> {/* Placeholder avatar */}
        <div className="profile-info">
          <h4 className='username'>{username}</h4>
          <p></p>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li><a href="/" className="selected"><FaNewspaper className="icon" />News</a></li>
          
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <a href="/"><FaCog className="icon" />Account</a> 
        <a href="/" onClick={logout}><FaSignOutAlt className="icon" />Log Out</a>
      </div>
    </aside>
  );
};

export default Sidebar;
