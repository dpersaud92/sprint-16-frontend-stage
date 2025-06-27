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
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import useAuth from "../../hooks/useAuth";
import SuccessModal from "../SuccessModal/SuccessModal";

function AppWrapper() {
  const { isLoggedIn, currentUser, handleLogin, handleRegister, handleLogout } =
    useAuth();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [articles, setArticles] = useState(() => {
    const stored = localStorage.getItem("articles");
    return stored ? JSON.parse(stored) : [];
  });
  const [status, setStatus] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const userKey = currentUser?.email || "guest";

  const [savedArticles, setSavedArticles] = useState(() => {
    const data = JSON.parse(localStorage.getItem("savedArticlesPerUser")) || {};
    return data[userKey] || [];
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedArticlesPerUser")) || {};
    data[userKey] = savedArticles;
    localStorage.setItem("savedArticlesPerUser", JSON.stringify(data));
  }, [savedArticles, userKey]);

  const handleToggleSave = (article) => {
    setSavedArticles((prev) => {
      const alreadySaved = prev.find((a) => a.id === article.id);
      return alreadySaved
        ? prev.filter((a) => a.id !== article.id)
        : [...prev, article];
    });
  };

  const handleSearch = (query) => {
    setIsLoading(true);
    setStatus("");

    getArticles(query)
      .then((results) => {
        setArticles(results);
        if (results.length === 0) {
          setStatus("no-results");
        }
      })
      .catch(() => setStatus("error"))
      .finally(() => setIsLoading(false));
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
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                savedArticles={savedArticles}
                onSaveToggle={handleToggleSave}
                onClearAll={() => setSavedArticles([])}
                currentUser={currentUser}
                onLogout={handleLogout}
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
          onLogin={handleLogin}
        />
      )}

      {isRegisterOpen && (
        <RegisterModal
          onClose={() => setIsRegisterOpen(false)}
          onSwitch={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
          onRegister={(email, password, username) => {
            handleRegister(email, password, username);
            setIsRegisterOpen(false);
            setIsSuccessModalOpen(true);

            setTimeout(() => {
              setIsFadingOut(true);
            }, 2500);

            setTimeout(() => {
              setIsSuccessModalOpen(false);
              setIsFadingOut(false);
              setIsLoginOpen(true);
            }, 3000);
          }}
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
    </Router>
  );
}

export default App;
