// src/components/ArticleCard.js
import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <img width={300} src={article.imageUrl} alt={article.title} />
      <h3>{article.title}</h3>
      <p>{article.summary}</p>
      <p><strong>Source:</strong> {article.source}</p>
      <p><strong>Date:</strong> {new Date(article.date).toLocaleDateString()}</p>
    </div>
  );
};

export default ArticleCard;
