import React, { useEffect } from "react";
import ReactModal from "react-modal";

const Modal = ({ showModal, handleOpenModal, className, children, style }) => {
  useEffect(() => {
    ReactModal.setAppElement('body');
  })
  return (
    <ReactModal
      isOpen={showModal}
      style={{ content: style }}
      className={className}
      onRequestClose={() => handleOpenModal(false)}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
