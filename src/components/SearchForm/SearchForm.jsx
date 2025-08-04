import React, { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with query:", query);
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <section className="search">
      <div className="search__overlay">
        <div className="search__description">
          <h1 className="search__title">What’s going on in the world?</h1>
          <p className="search__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
        </div>

        <form className="search__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search__input"
            placeholder="Enter topic"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search__button">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
