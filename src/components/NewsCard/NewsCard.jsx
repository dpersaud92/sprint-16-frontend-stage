import React from "react";
import "./NewsCard.css";

export default function NewsCard({ article, onSaveClick, isSaved }) {
  return (
    <div className="news-card">
      <img src={article.imageUrl} alt={article.title} />
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <span>{article.source}</span>
      <button
        className={`save-button ${isSaved ? "saved" : ""}`}
        onClick={onSaveClick}
      >
        {isSaved ? "💾 Saved" : "💾 Save"}
      </button>
    </div>
  );
}
