import React from "react";
import "./SuccessModal.css";

export default function SuccessModal({ onClose, onSignInClick, fadeOut }) {
  return (
    <div className={`modal-overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal__title">Registration successfully completed!</h2>
        <button className="modal__link" onClick={onSignInClick}>
          Sign in
        </button>
      </div>
    </div>
  );
}
