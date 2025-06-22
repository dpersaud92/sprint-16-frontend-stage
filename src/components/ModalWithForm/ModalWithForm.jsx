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
          &times;
        </button>
        <h2>{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}
