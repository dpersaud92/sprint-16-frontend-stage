import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./Profile.css";

export default function Profile({
  savedArticles,
  onSaveToggle,
  onClearAll,
  currentUser,
}) {
  const handleUnsave = (id) => {
    onSaveToggle({ id });
  };

  const getKeywordSummary = (articles) => {
    const keywords = [...new Set(articles.map((a) => a.keyword))];
    if (keywords.length === 0) return "";
    if (keywords.length === 1) return keywords[0];
    if (keywords.length === 2) return `${keywords[0]}, ${keywords[1]}`;
    return `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} other`;
  };

  return (
    <main className="profile-page">
      <section className="profile__header">
        <h2 className="profile__title">
          {currentUser?.username || "User"}, you have {savedArticles.length}{" "}
          saved article{savedArticles.length !== 1 && "s"}
        </h2>
        {savedArticles.length > 0 && (
          <>
            <p className="profile__keywords">
              By keywords: {getKeywordSummary(savedArticles)}
            </p>
            <button className="clear-button" onClick={onClearAll}>
              🗑️ Clear All Saved Articles
            </button>
          </>
        )}
      </section>

      {savedArticles.length === 0 ? (
        <p>No saved articles yet.</p>
      ) : (
        <div className="card-list">
          {savedArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onSaveClick={() => handleUnsave(article.id)}
              isLoggedIn={true}
              isSaved={true}
            />
          ))}
        </div>
      )}
    </main>
  );
}
