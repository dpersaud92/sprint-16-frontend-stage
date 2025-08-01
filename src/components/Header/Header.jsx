import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header({
  isLoggedIn,
  currentUser,
  onLoginClick,
  onLogout,
}) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const linkclassName = (path) =>
    `header__link ${location.pathname === path ? "header__link--active" : ""}`;

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`header ${isHome ? "header--home" : "header--profile"}`}
      >
        <div className="header__container">
          <Link to="/" className="header__logo">
            NewsExplorer
          </Link>
          <button
            className="header__menu-icon"
            onClick={() => setShowMobileMenu(true)}
            aria-label="Open menu"
          >
            &#9776;
          </button>

          <div className="header__nav-actions">
            <nav className="header__nav">
              <Link to="/" className={linkclassName("/")}>
                Home
              </Link>
              {isLoggedIn && (
                <Link to="/profile" className={linkclassName("/profile")}>
                  Saved articles
                </Link>
              )}
            </nav>
            {isLoggedIn ? (
              <div className="header__menu" ref={dropdownRef}>
                <button
                  className="header__user-btn"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  {currentUser?.username || "User"}{" "}
                  <span className="header__icon">↪</span>
                </button>
                {showDropdown && (
                  <div className="header__dropdown">
                    <button
                      className="header__dropdown-item"
                      onClick={onLogout}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="header__auth-btn" onClick={onLoginClick}>
                Sign in
              </button>
            )}
          </div>
        </div>
      </header>

      {showMobileMenu && (
        <div className="header__overlay">
          <div className="header__overlay-header">
            <Link
              to="/"
              className="header__logo"
              onClick={() => setShowMobileMenu(false)}
            >
              NewsExplorer
            </Link>
            <button
              className="header__close-icon"
              onClick={() => setShowMobileMenu(false)}
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          <nav className="header__overlay-nav">
            <Link
              to="/"
              className="header__overlay-link"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            {isLoggedIn && (
              <Link
                to="/profile"
                className="header__overlay-link"
                onClick={() => setShowMobileMenu(false)}
              >
                Saved articles
              </Link>
            )}
          </nav>

          <div className="header__overlay-actions">
            {!isLoggedIn ? (
              <button className="header__auth-btn" onClick={onLoginClick}>
                Sign in
              </button>
            ) : (
              <button className="header__auth-btn" onClick={onLogout}>
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
