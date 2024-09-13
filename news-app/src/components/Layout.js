import React from 'react';
import { FaCloud, FaFilm, FaMusic, FaPlane, FaCog, FaSignOutAlt, FaQuestionCircle, FaNewspaper } from 'react-icons/fa';
import './Sidebar.css'; 
import './Header.css';

const Layout = () => {
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="profile">
          <img src="user-profile-url" alt="Vladimir Raksha" className="profile-pic" />
          <div className="profile-info">
            <h4>Vladimir Raksha</h4>
            <p>Premium Plan</p>
          </div>
        </div>
        
        <div className="sidebar-footer">
          <a href="/"><FaCog /> Account</a>
          <a href="/"><FaCog /> Settings</a>
          <a href="/"><FaQuestionCircle /> Help & Support</a>
          <a href="/login"><FaSignOutAlt /> Log Out</a>
        </div>
      </aside>
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <FaBars className="menu-icon" />
            <div className="logo">Maise</div>
            <nav className="nav">
              <ul>
                <li><a href="/">Latest News</a></li>
                <li><a href="/">Politics</a></li>
                <li><a href="/">Business</a></li>
                <li><a href="/">Sports</a></li>
                <li><a href="/">Tech</a></li>
                <li><a href="/">More</a></li>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Type to search..." className="search-bar" />
            </div>
            <FaBell className="icon" />
            <FaUserCircle className="icon" />
          </div>
        </header>
        <div className="content">
          <h1>Welcome to the Main Content</h1>
          <p>This is where your main content will appear.</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
