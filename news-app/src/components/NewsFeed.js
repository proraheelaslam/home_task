import React, { useContext, useState, useEffect } from 'react';
import './NewsFeed.css';
import Loader from './Loader';
import { NewsContext } from '../context/NewsContext';

const NewsFeed = () => {
  const { news, loading, error } = useContext(NewsContext);
  const [page, setPage] = useState(1); // Current page for pagination

  useEffect(() => {
    // This handles infinite scroll (or you can implement pagination here)
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  if (loading && page === 1) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="news-feed">
      {news.length > 0 && (
        <>
          <div className="news-item large">
            <img
              src={news[0].urlToImage || 'https://via.placeholder.com/700x400'}
              alt={news[0].title}
              className="news-image"
            />
            <h2>{news[0].title}</h2>
            <p className="news-author">{news[0].author || 'Unknown Author'} - {new Date(news[0].publishedAt).toLocaleTimeString()}</p>
          </div>
          <div className="news-grid">
            {news.slice(1).map((item, index) => (
              <div className="news-item" key={index}>
                <img
                  src={item.urlToImage || 'https://via.placeholder.com/300x200'}
                  alt={item.title}
                  className="news-image"
                />
                <h2>{item.title}</h2>
                <p className="news-author">{item.author || 'Unknown Author'} - {new Date(item.publishedAt).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
          {loading && <Loader />}
        </>
      )}
    </section>
  );
};

export default NewsFeed;
