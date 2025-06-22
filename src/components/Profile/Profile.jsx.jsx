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
    setSavedArticles((prev) => prev.filter((article) => article.id !== id));
  };

  {
    savedArticles.length > 0 && (
      <button className="clear-button" onClick={() => onClearAll()}>
        🗑️ Clear All Saved Articles
      </button>
    );
  }

  return (
    <main className="profile-page">
      <h2>{currentUser?.name}'s Saved Articles</h2>
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
