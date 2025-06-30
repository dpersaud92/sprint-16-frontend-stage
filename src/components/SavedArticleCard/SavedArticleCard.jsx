import React from "react";
import "./SavedArticleCard.css";

const trashIcon = "/assets/trash.svg";

export default function SavedArticleCard({ article, onDelete }) {
  const { title, text, date, image, source, link } = article;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="saved-card">
      <div className="saved-card__badge">{article.keyword}</div>

      <button
        className="saved-card__trash"
        onClick={() => onDelete(article)}
        aria-label="Delete article"
      >
        <img src={trashIcon} alt="delete" />
      </button>

      <a
        href={link}
        className="saved-card__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="saved-card__image"
          src={image || "https://via.placeholder.com/600x400?text=No+Image"}
          alt={title}
        />
        <div className="saved-card__content">
          <p className="saved-card__date">{formattedDate}</p>
          <h3 className="saved-card__title">{title}</h3>
          <p className="saved-card__desc">{text}</p>
          <p className="saved-card__source">{source}</p>
        </div>
      </a>
    </div>
  );
}
