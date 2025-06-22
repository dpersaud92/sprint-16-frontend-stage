import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import NewsCard from "../NewsCard/NewsCard";
import PreLoader from "../PreLoader/PreLoader";
import { getArticles } from "../../utils/mockData";
import { motion, AnimatePresence } from "framer-motion";

export default function Main({ isLoggedIn, onSaveToggle, savedArticles }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(""); // "no-results" | "error" | ""

  const handleSearch = (query) => {
    setIsLoading(true);
    setStatus("");

    getArticles(query)
      .then((results) => {
        setCards(results);
        if (results.length === 0) {
          setStatus("no-results");
        }
      })
      .catch(() => setStatus("error"))
      .finally(() => setIsLoading(false));
  };

  return (
    <main>
      <SearchForm onSearch={handleSearch} />
      <h2>Latest Articles</h2>

      {isLoading && <PreLoader />}

      {!isLoading && status === "no-results" && <p>No results found.</p>}
      {!isLoading && status === "error" && (
        <p>Something went wrong. Please try again.</p>
      )}

      {!isLoading && cards.length > 0 && (
        <div className="card-list">
          <AnimatePresence>
            {cards.map((article) => {
              const isSaved = savedArticles.some((a) => a.id === article.id);
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <NewsCard
                    article={article}
                    isLoggedIn={isLoggedIn}
                    isSaved={isSaved}
                    onSaveClick={() => onSaveToggle(article)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}
