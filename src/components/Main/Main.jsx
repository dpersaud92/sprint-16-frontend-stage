import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import PreLoader from "../PreLoader/PreLoader";
import About from "../About/About";
import { fetchNewsArticles } from "../../utils/api";
import "./Main.css";

export default function Main({ isLoggedIn, onSaveToggle, savedArticles }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(""); // "", "no-results", "error"

  const handleSearch = (query) => {
    setIsLoading(true);
    setStatus("");

    fetchNewsArticles(query)
      .then((results) => {
        if (results.length === 0) {
          setStatus("no-results");
        }

        const enriched = results.map((article) => ({
          ...article,
          keyword: query,
        }));

        setArticles(enriched);
      })
      .catch(() => setStatus("error"))
      .finally(() => setIsLoading(false));
  };

  const handleShowMore = () => {
    console.log("Show more clicked");
  };

  return (
    <main>
      <SearchForm onSearch={handleSearch} />

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
          handleShowMore={handleShowMore}
        />
      )}
    </main>
  );
}
