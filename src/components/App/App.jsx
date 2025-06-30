import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SuccessModal from "../SuccessModal/SuccessModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuth from "../../hooks/useAuth";
import {
  getArticles,
  getSavedArticles,
  saveArticle,
  deleteArticle,
} from "../../utils/api";

function AppWrapper() {
  const {
    isLoggedIn,
    currentUser,
    token,
    handleLogin,
    handleRegister,
    handleLogout,
    isAuthResolved,
  } = useAuth();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [isSavedLoading, setIsSavedLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      setIsSavedLoading(true);
      getSavedArticles(token)
        .then((data) => setSavedArticles(data))
        .catch((err) => console.error("Error loading saved articles:", err))
        .finally(() => setIsSavedLoading(false));
    }
  }, [isLoggedIn, currentUser]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setStatus("");
    setLastQuery(query);

    getArticles(query).then((results) => {
      const enrichedResults = results.map((article) => ({
        ...article,
        keyword: query, // attach search term
      }));
      setArticles(enrichedResults);
      if (enrichedResults.length === 0) setStatus("no-results");
    });
  };

  const handleToggleSave = async (article) => {
    try {
      const existing = savedArticles.find((a) => a.url === article.url);
      if (existing) {
        await deleteArticle(token, existing._id);
        setSavedArticles((prev) => prev.filter((a) => a._id !== existing._id));
        toast.success("Article removed");
        console.log("🔍 Raw article received:", article);
      } else {
        const mappedArticle = {
          keyword: article.keyword || lastQuery || "Articles",
          title: article.title || "Untitled",
          content: article.description || "No description provided.",
          date: article.publishedAt || new Date().toISOString(),
          source: article.source?.name || "Unknown source",
          link: article.url || "https://example.com",

          image:
            article.urlToImage ||
            article.image ||
            "https://placehold.co/600x400?text=No+Image",
        };
        console.log("💡 Keyword used to save:", mappedArticle.keyword);
        const saved = await saveArticle(token, mappedArticle);
        setSavedArticles((prev) => [...prev, saved]);
        toast.success("Article saved!");
      }
    } catch (err) {
      console.error("Error saving/removing article:", err);
      toast.error("Something went wrong");
    }
  };

  const handleClearAll = async () => {
    try {
      await Promise.all(savedArticles.map((a) => deleteArticle(token, a._id)));
      setSavedArticles([]);
      toast.success("All articles cleared");
    } catch (err) {
      console.error("Error clearing saved articles:", err);
      toast.error("Could not clear articles");
    }
  };

  const handleRegisterSuccess = (email, password, username) => {
    handleRegister(email, password, username);
    setIsRegisterOpen(false);
    setIsSuccessModalOpen(true);
    setTimeout(() => setIsFadingOut(true), 2500);
    setTimeout(() => {
      setIsSuccessModalOpen(false);
      setIsFadingOut(false);
      setIsLoginOpen(true);
    }, 3000);
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main
                isLoggedIn={isLoggedIn}
                savedArticles={savedArticles}
                onSaveToggle={handleToggleSave}
                isLoading={isLoading}
                articles={articles}
                onSearch={handleSearch}
              />
              <About />
            </>
          }
        />

        <Route path="/about" element={<About />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              isAuthResolved={isAuthResolved}
            >
              <Profile
                savedArticles={[...savedArticles].sort((a, b) =>
                  a.keyword.localeCompare(b.keyword)
                )}
                onSaveToggle={handleToggleSave}
                onClearAll={handleClearAll}
                currentUser={currentUser}
                onLogout={handleLogout}
                isSavedLoading={isSavedLoading}
              />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onSwitch={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
          onLogin={(email, password) => handleLogin(email, password, false)}
        />
      )}

      {isRegisterOpen && (
        <RegisterModal
          onClose={() => setIsRegisterOpen(false)}
          onSwitch={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
          onRegister={handleRegisterSuccess}
        />
      )}

      {isSuccessModalOpen && (
        <SuccessModal
          fadeOut={isFadingOut}
          onClose={() => {
            setIsSuccessModalOpen(false);
            setIsFadingOut(false);
          }}
          onSignInClick={() => {
            setIsSuccessModalOpen(false);
            setIsFadingOut(false);
            setIsLoginOpen(true);
          }}
        />
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
