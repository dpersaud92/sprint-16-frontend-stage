import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <p>© 2025 Dwayne Persaud</p>
        <p>Powered by GNews API</p>
      </div>
      <div className="footer__right">
        <Link to="/" className="footer__link">
          Home
        </Link>
        <a
          href="https://tripleten.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          TripleTen
        </a>
        <a
          href="https://github.com/dpersaud92"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__icon"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/dwayne-persaud-174b562a6/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__icon"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
