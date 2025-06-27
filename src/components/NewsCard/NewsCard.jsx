import React from "react";
import "./NewsCard.css";

export default function NewsCard({
  article,
  onSaveClick,
  isLoggedIn,
  isSaved,
}) {
  const { title, description, url, image, source, publishedAt } = article;

  return (
    <div className="news-card">
      <img src={image} alt={title} className="news-card__image" />

      <button
        className="news-card__bookmark"
        onClick={onSaveClick}
        disabled={!isLoggedIn}
        aria-label={
          isLoggedIn
            ? isSaved
              ? "Remove from saved"
              : "Save article"
            : "Sign in to save articles"
        }
      >
        {isSaved ? "🔖" : "📌"}
      </button>

      <div className="news-card__content">
        <p className="news-card__date">
          {new Date(publishedAt).toLocaleDateString()}
        </p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>
        <p className="news-card__source">{source?.name}</p>
      </div>
    </div>
  );
}
