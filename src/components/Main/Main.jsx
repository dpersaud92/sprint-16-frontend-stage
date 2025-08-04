import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import PreLoader from "../PreLoader/PreLoader";
import notFound from "../../../public/assets/notFound.svg";
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
        <div className="status-block">
          <img
            className="status__not-found"
            src={notFound}
            alt="No results found"
          />
          <h2 className="status-text">Nothing Found</h2>
          <h3 className="status-description">
            Sorry, but nothing matched your search terms.
          </h3>
        </div>
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
