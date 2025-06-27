import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({ onClose, onSwitch, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isFormValid =
    isEmailValid && password.length >= 6 && username.length >= 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Actual password value at submit:", password);

    if (!isFormValid) {
      setError("Please fill out all fields correctly");
      return;
    }
    onRegister(email, password, username);
    console.log("SUBMITTING", { email, password, username });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal__title">Sign up</h2>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="modal__form"
        >
          <label className="modal__label">Email</label>
          <input
            className="modal__input"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="modal__label">Password</label>
          <input
            className="modal__input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="modal__label">Username</label>
          <input
            className="modal__input"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <button
            className={`modal__button ${
              isFormValid ? "modal__button--active" : ""
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            Sign up
          </button>
        </form>

        <button type="button" className="modal__switch-link" onClick={onSwitch}>
          or Sign in
        </button>
      </div>
    </div>
  );
}
