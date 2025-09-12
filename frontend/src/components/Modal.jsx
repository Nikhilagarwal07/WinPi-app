// File: frontend/src/components/Modal.jsx

import React from "react";
import ReactDOM from "react-dom";
import { useModal } from "../context/ModalContext";

export default function Modal() {
  const { isOpen, modalContent } = useModal();

  if (!isOpen) {
    return null;
  }

  const modalUI = (
    <div className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`bg-brand-card border border-white/10 rounded-lg shadow-xl p-6 w-full max-w-sm animate-pop-in`}
      >
        {modalContent}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalUI, document.getElementById("modal-root"));
}
