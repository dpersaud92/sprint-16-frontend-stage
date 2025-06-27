import React, { useState, useRef, useEffect } from "react";
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
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const linkClass = (path) =>
    `header__link ${location.pathname === path ? "header__link--active" : ""}`;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`header ${isHome ? "header--home" : "header--profile"}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>

        <div className="header__nav-actions">
          <nav className="header__nav">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>

            {isLoggedIn && (
              <Link to="/profile" className={linkClass("/profile")}>
                Saved articles
              </Link>
            )}
          </nav>

          {isLoggedIn ? (
            <div className="header__menu" ref={menuRef}>
              <button
                className="header__user-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu((prev) => !prev);
                }}
              >
                {currentUser?.username || "User"}{" "}
                <span className="header__icon">↪</span>
              </button>
              {showMenu && (
                <div className="header__dropdown">
                  <button className="header__dropdown-item" onClick={onLogout}>
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
  );
}
