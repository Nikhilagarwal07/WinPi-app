// File: frontend/src/context/ModalContext.jsx

import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const showModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    // Allow animation to finish before clearing content
    setTimeout(() => setModalContent(null), 300);
  };

  const value = { isOpen, showModal, hideModal, modalContent };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};