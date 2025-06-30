import React from "react";
import "./NewsCard.css";

const bookmarkIcon = "/assets/bookmark.svg";

export default function NewsCard({
  article,
  onSaveClick,
  isLoggedIn,
  isSaved,
}) {
  const { title, description, url, image, source, publishedAt } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="news-card">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card__link"
      >
        <img src={image} alt={title} className="news-card__image" />
        <div className="news-card__content">
          <p className="news-card__date">{formattedDate}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__description">{description}</p>
          <p className="news-card__source">{source?.name}</p>
        </div>
      </a>

      <button
        className={`news-card__bookmark ${
          isSaved ? "news-card__bookmark--saved" : ""
        }`}
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
        <img src={bookmarkIcon} alt="" className="news-card__save-icon" />
      </button>
    </div>
  );
}
