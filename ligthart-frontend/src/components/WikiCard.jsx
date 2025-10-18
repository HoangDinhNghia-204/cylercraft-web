// src/components/WikiCard.jsx
import React from 'react';

const WikiCard = ({ article }) => {
  return (
    <div className="wiki-card">
      <div className="wiki-info">
        <h3 className="wiki-title">{article.title}</h3>
        <p className="wiki-description">{article.description}</p>
        <a href="#">
          <button className="profile__button" style={{ marginTop: 'auto' }}>
            Đọc thêm
          </button>
        </a>
      </div>
    </div>
  );
};

export default WikiCard;