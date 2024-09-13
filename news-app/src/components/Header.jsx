import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for the date picker
import './Header.css';

const Header = ({ onSearch, onCategorySelect, onDateSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [startDate, setStartDate] = useState(null); // Manage date state

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategorySelect(category, startDate); // Pass date along with category
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    onDateSelect(date); // Send selected date to parent component
  };

  return (
    <header className="header">
      <div className="header-left">
        <nav className="nav">
          <ul>
            <li>
              <a
                href="#"
                className={activeCategory === 'business' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleCategoryClick('business'); }}
              >
                Business
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeCategory === 'entertainment' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleCategoryClick('entertainment'); }}
              >
                Entertainment
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeCategory === 'health' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleCategoryClick('health'); }}
              >
                Health
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeCategory === 'sports' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleCategoryClick('sports'); }}
              >
                Sports
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-right">

      <div className="date-picker-container">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            placeholderText="Select a date"
            dateFormat="yyyy/MM/dd"
            className="date-picker"
          />
        </div>

        
        <div className="search-container">
         
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Type to search..."
            className="search-bar"
          />
        </div>
       
      </div>
    </header>
  );
};

export default Header;
