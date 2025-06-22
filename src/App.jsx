import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import Profile from "./components/Profile/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import useAuth from "./hooks/useAuth";

function AppWrapper() {
  const { isLoggedIn, currentUser, handleLogin, handleRegister, handleLogout } =
    useAuth();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLoggedIn={isLoggedIn}
              savedArticles={savedArticles}
              onSaveToggle={handleToggleSave}
            />
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
          onRegister={handleRegister}
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
