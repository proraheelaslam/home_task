// src/pages/HomePage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import NewsFeed from '../components/NewsFeed';

const dummyArticles = [
  { id: 1, title: 'Article 1', summary: 'Summary 1', imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', date: '2023-08-10', source: 'Source 1', category: 'Tech' },
  { id: 2, title: 'Article 2', summary: 'Summary 2', imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', date: '2023-08-15', source: 'Source 2', category: 'Health' },
  // Add more articles
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(dummyArticles);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterArticles(term, filters);
  };

  const [filters, setFilters] = useState({ date: '', category: '', source: '' });

  const handleFilter = (filter) => {
    const updatedFilters = { ...filters, [filter.type]: filter.value };
    setFilters(updatedFilters);
    filterArticles(searchTerm, updatedFilters);
  };

  const filterArticles = (searchTerm, filters) => {
    const result = dummyArticles.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = filters.date ? new Date(article.date) >= new Date(filters.date) : true;
      const matchesCategory = filters.category ? article.category === filters.category : true;
      const matchesSource = filters.source ? article.source === filters.source : true;
      return matchesSearch && matchesDate && matchesCategory && matchesSource;
    });
    setFilteredArticles(result);
  };

  return (
    <div className="home-page">
      <Header onSearch={handleSearch} />
      <Filters onFilter={handleFilter} />
      <NewsFeed articles={filteredArticles} />
    </div>
  );
};

export default HomePage;
