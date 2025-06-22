import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({ onClose, onSwitch, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password); // 🔑 call the handler from props
  };

  return (
    <ModalWithForm title="Sign In" onClose={onClose} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign In</button>
      <p>
        Not a member?{" "}
        <button onClick={onSwitch} className="modal__link" type="button">
          Sign up
        </button>
      </p>
    </ModalWithForm>
  );
}
