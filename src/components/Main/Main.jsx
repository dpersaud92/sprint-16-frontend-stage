import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import PreLoader from "../PreLoader/PreLoader";
import "./Main.css";

export default function Main({
  isLoggedIn,
  onSaveToggle,
  onUnauthenticatedSave,
  savedArticles,
  onSearch,
  isLoading,
  articles,
  status,
  handleShowMore,
}) {
  return (
    <>
      <SearchForm onSearch={onSearch} />

      {isLoading && <PreLoader />}

      {!isLoading && status === "no-results" && (
        <p className="status-text">No results found.</p>
      )}

      {!isLoading && status === "error" && (
        <p className="status-text">Something went wrong. Please try again.</p>
      )}

      {!isLoading && articles.length > 0 && (
        <NewsCardList
          articles={articles}
          onSaveClick={onSaveToggle}
          isLoggedIn={isLoggedIn}
          isSaved={false}
          onUnauthenticatedSaveClick={onUnauthenticatedSave}
          handleShowMore={handleShowMore}
        />
      )}
    </>
  );
}
