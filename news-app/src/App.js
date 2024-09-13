import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NewsFeed from './components/NewsFeed';
import TrendingNews from './components/TrendingNews';
import Login from './components/Login';
import Register from './components/Register';
import { NewsProvider } from './context/NewsContext';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // State for the selected date
  
  return (
    <AuthProvider> {/* Wrap everything in AuthProvider */}
      <NewsProvider 
        searchQuery={searchQuery} 
        category={category} 
        selectedDate={selectedDate} // Pass the selected date to NewsProvider
      >
        <div className="app-container">
          <Routes>
            {/* Protect the main app route */}
            <Route path="/" element={
              <PrivateRoute> {/* This route is protected */}
                <>
                  <div className="main-wrapper">
                    <Sidebar />
                  </div>
                  <div className="main-content">
                    <Header 
                      onSearch={setSearchQuery} 
                      onCategorySelect={setCategory}  // Handle category selection
                      onDateSelect={setSelectedDate} // Handle date selection
                    />
                    <div className="news-sections">
                      <NewsFeed 
                        searchQuery={searchQuery} 
                        category={category} 
                        date={selectedDate} // Pass the selected date
                      />
                      <TrendingNews />
                    </div>
                  </div>
                </>
              </PrivateRoute>
            }/>
            
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </NewsProvider>
    </AuthProvider>
  );
}

export default App;
