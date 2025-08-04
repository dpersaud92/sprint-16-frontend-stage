import React, { useState } from "react";
import SavedArticleCard from "../SavedArticleCard/SavedArticleCard";
import "./Profile.css";

export default function Profile({
  savedArticles,
  onDeleteArticle,
  onSaveToggle,
  onClearAll,
  currentUser,
  isSavedLoading,
}) {
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [showAllKeywords, setShowAllKeywords] = useState(false);

  const filteredArticles = selectedKeyword
    ? savedArticles.filter((a) => a.keyword === selectedKeyword)
    : savedArticles;

  const getKeywordSummary = (articles) => {
    const keywords = [...new Set(articles.map((a) => a.keyword))];

    const renderKeyword = (kw) => (
      <button
        key={kw}
        onClick={() => setSelectedKeyword(kw)}
        className="keyword-link"
      >
        {kw}
      </button>
    );

    if (keywords.length === 0) return "";

    if (showAllKeywords) {
      return (
        <>
          {keywords.map((kw, i) => (
            <React.Fragment key={kw}>
              {renderKeyword(kw)}
              {i < keywords.length - 1 ? ", " : ""}
            </React.Fragment>
          ))}
          <button
            className="keyword-link"
            onClick={() => setShowAllKeywords(false)}
          >
            (show less)
          </button>
        </>
      );
    }

    if (keywords.length <= 2) {
      return keywords.map((kw, i) => (
        <React.Fragment key={kw}>
          {renderKeyword(kw)}
          {i === 0 && keywords.length === 2 ? ", " : ""}
        </React.Fragment>
      ));
    }

    const hiddenCount = keywords.length - 2;
    return (
      <>
        {renderKeyword(keywords[0])}, {renderKeyword(keywords[1])}, and{" "}
        <button
          className="keyword-link"
          onClick={() => setShowAllKeywords(true)}
        >
          {hiddenCount} other{hiddenCount > 1 ? "s" : ""}
        </button>
      </>
    );
  };

  return (
    <main className="profile-page">
      <section className="profile__header">
        <h1 className="profile__title">
          {currentUser?.username || "User"}, you have {savedArticles.length}{" "}
          saved article{savedArticles.length !== 1 ? "s" : ""}
        </h1>

        {savedArticles.length > 0 && (
          <>
            <h2 className="profile__subtitle">
              By keywords:{" "}
              <span className="profile__keywords">
                {getKeywordSummary(savedArticles, setSelectedKeyword)}
              </span>
            </h2>

            {selectedKeyword && (
              <h2 className="profile__keywords">
                Showing results for:{" "}
                <strong style={{ color: "#000" }}>{selectedKeyword}</strong>{" "}
                <button
                  className="keyword-link"
                  onClick={() => setSelectedKeyword(null)}
                >
                  (Show All)
                </button>
              </h2>
            )}

            <button className="clear-button" onClick={onClearAll}>
              🗑️ Clear All Saved Articles
            </button>
          </>
        )}
      </section>

      <section className="profile__cards">
        {isSavedLoading ? (
          <div className="loader">Loading...</div>
        ) : filteredArticles.length === 0 ? (
          <h2>No saved articles yet.</h2>
        ) : (
          filteredArticles.map((article) => (
            <SavedArticleCard
              key={article._id}
              article={article}
              onDelete={onSaveToggle}
            />
          ))
        )}
      </section>
    </main>
  );
}
