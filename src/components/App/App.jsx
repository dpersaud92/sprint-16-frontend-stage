import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <Router>
      <Header />

      {/* TEMPORARY login toggles */}
      <button onClick={() => setIsLoggedIn(true)}>Log In (Temp)</button>
      <button onClick={() => setIsLoggedIn(false)}>Log Out (Temp)</button>

      {/* Modal Triggers */}
      <button onClick={() => setIsLoginOpen(true)}>Open Login Modal</button>
      <button onClick={() => setIsRegisterOpen(true)}>
        Open Register Modal
      </button>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />

      {/* Modals */}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onSwitch={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
        />
      )}

      {isRegisterOpen && (
        <RegisterModal
          onClose={() => setIsRegisterOpen(false)}
          onSwitch={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
        />
      )}
    </Router>
  );
}
