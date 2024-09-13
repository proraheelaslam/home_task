import React, { createContext, useState, useEffect, useContext } from 'react';
import { get } from '../services/apiService';
import { useAuth } from './AuthContext'; // Make sure to import the AuthContext

const NewsContext = createContext();

const NewsProvider = ({ children, searchQuery, category, selectedDate }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth(); // Access the user object from AuthContext

  const fetchNews = async () => {
    const token = user?.token; // Retrieve token from the user object

    setLoading(true);
    try {
      const query = searchQuery ? `q=${searchQuery}` : ''; // Include search term if present
      const categoryParam = category ? `&category=${category}` : ''; // Include category if present
      const dateParam = selectedDate ? `&from=${selectedDate.toISOString().split('T')[0]}` : ''; // Format date

      // API call to fetch news with query, category, and date
      const { data, success, error } = await get(`/news/search?${query}${categoryParam}${dateParam}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });

      if (success && data?.newsApi?.articles) {
        setNews(data.newsApi.articles); // Store all fetched news
      } else {
        setError(error || 'Failed to fetch news');
      }
    } catch (err) {
      setError('Error fetching news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchNews(); // Fetch news if user is logged in and parameters change
    }
  }, [user, searchQuery, category, selectedDate]);

  return (
    <NewsContext.Provider value={{ news, loading, error, fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
};

export { NewsProvider, NewsContext };
