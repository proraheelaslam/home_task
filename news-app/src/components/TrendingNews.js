import React, { useContext } from 'react';
import './TrendingNews.css';
import { NewsContext } from '../context/NewsContext';

const TrendingNews = () => {
  const { news, loading, error } = useContext(NewsContext);

  if (loading) {
    return <p>Loading...</p>; // Show a loader during loading
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Display the latest 7 news items
  const trendingItems = news.slice(0, 7);

  return (
    <aside className="trending-news">
      <h2>Trending News</h2>
      <ul>
        {trendingItems.map((item, index) => (
          <li key={index} className="trending-item">
            <img src={item.urlToImage || 'https://via.placeholder.com/60'} alt={item.title} className="trending-image" />
            <div className="trending-info">
              <span className="category">{item.category || 'Category'}</span>
              <h3 className="trending-title">{item.title}</h3>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TrendingNews;
