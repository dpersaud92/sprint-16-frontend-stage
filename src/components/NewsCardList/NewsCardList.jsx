import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

export default function NewsCardList({
  articles,
  onSaveClick,
  isLoggedIn,
  isSaved,
  handleShowMore,
}) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="news-card-list">
      {articles.map((article) => (
        <NewsCard
          key={
            article._id ||
            article.url ||
            `${article.title}-${article.publishedAt}`
          }
          article={article}
          isLoggedIn={isLoggedIn}
          isSaved={isSaved}
          onSaveClick={() => onSaveClick(article)}
        />
      ))}

      <div className="news-card-list__button-wrapper">
        <button className="show-more-button" onClick={handleShowMore}>
          Show more
        </button>
      </div>
    </section>
  );
}
