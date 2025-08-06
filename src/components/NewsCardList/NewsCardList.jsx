import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

export default function NewsCardList({
  articles = [],
  isLoggedIn,
  savedArticles = [],
  onSaveClick,
  onUnauthenticatedSaveClick,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  if (articles.length === 0) return null;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <div className="news-card-list__wrapper">
      <h1 className="news-card-list__heading">Search results</h1>
      <section className="news-card-list">
        {visibleArticles.map((article) => (
          <NewsCard
            key={
              article._id ||
              article.url ||
              `${article.title}-${article.publishedAt}`
            }
            article={article}
            isLoggedIn={isLoggedIn}
            isSaved={savedArticles.some((a) => a.link === article.url)}
            onSaveClick={() => onSaveClick(article)}
            onUnauthenticatedSaveClick={onUnauthenticatedSaveClick}
          />
        ))}

        {visibleCount < articles.length && (
          <div className="news-card-list__button-wrapper">
            <button className="show-more-button" onClick={handleShowMore}>
              Show more
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
