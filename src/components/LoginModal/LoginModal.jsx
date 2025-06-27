import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

export default function LoginModal({ onClose, onSwitch, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isFormValid = isEmailValid && password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    onLogin(email, password)
      .then(() => {
        onClose();
      })
      .catch((err) => {
        setError("Invalid email or password");
        console.error("Login error:", err);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal__title">Sign in</h2>
        <form onSubmit={handleSubmit}>
          <label className="modal__label">Email</label>
          <input
            className="modal__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!isEmailValid && email.length > 0 && (
            <div className="modal__error">Invalid email address</div>
          )}

          <label className="modal__label">Password</label>
          <input
            className="modal__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="modal__error">{error}</p>}
          <button
            className={`modal__button ${
              isFormValid ? "modal__button--active" : ""
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            Sign in
          </button>
        </form>

        <button className="modal__switch-link" onClick={onSwitch}>
          or Sign up
        </button>
      </div>
    </div>
  );
}
