// src/components/Filters.js
import React from 'react';
import { categories, sources } from '../data/categories';

const Filters = ({ onFilter }) => {
  const handleDateChange = (e) => {
    onFilter({ type: 'date', value: e.target.value });
  };
  
  const handleCategoryChange = (e) => {
    onFilter({ type: 'category', value: e.target.value });
  };
  
  const handleSourceChange = (e) => {
    onFilter({ type: 'source', value: e.target.value });
  };
  
  return (
    <div className="filters">
      <label>
        Date:
        <input type="date" onChange={handleDateChange} />
      </label>
      <label>
        Category:
        <select onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Source:
        <select onChange={handleSourceChange}>
          {sources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filters;
