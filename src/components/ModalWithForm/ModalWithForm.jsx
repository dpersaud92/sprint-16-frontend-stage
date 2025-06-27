import React from "react";
import "./ModalWithForm.css";

export default function ModalWithForm({ title, children, onClose, onSubmit }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <h2>{title}</h2>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="modal__form"
        >
          {children}
        </form>
      </div>
    </div>
  );
}
