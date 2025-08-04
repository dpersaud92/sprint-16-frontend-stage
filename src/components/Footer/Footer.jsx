import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__links">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} NewsExplorer, powered by GNEWS
          </p>
          <div className="footer__navLinks">
            <nav className="footer__nav">
              <Link to="/" className="footer__link">
                Home
              </Link>
              <a
                href="https://tripleten.com"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                TripleTen
              </a>
            </nav>
            <div className="footer__social">
              <a
                href="https://github.com/dpersaud92"
                className="footer__icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/dwayne-persaud-174b562a6/"
                className="footer__icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
