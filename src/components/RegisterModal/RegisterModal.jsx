import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({ onClose, onSwitch, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password, name);
  };

  return (
    <ModalWithForm title="Sign Up" onClose={onClose} onSubmit={handleSubmit}>
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
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />

      <button type="submit">Sign Up</button>
      <p>
        Already have an account?{" "}
        <button onClick={onSwitch} className="modal__link" type="button">
          Sign in
        </button>
      </p>
    </ModalWithForm>
  );
}
