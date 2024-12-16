import React, { useEffect } from "react";

function Modal({ isShowModal, children, setIsShowModal, setFormIndex = () => {} }) {
  useEffect(() => {
    if (isShowModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isShowModal]);

  return (
    <dialog
      className={`modal ${isShowModal ? "modal-open" : ""}`}
      open={isShowModal}
      onClick={() => {
        setIsShowModal(false);
        setFormIndex(0);
      }}
    >
      <div
        className="modal-box relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            setIsShowModal(false);
            setFormIndex(0);
          }}
        >
          ✕
        </button>

        {children}
      </div>
    </dialog>
  );
}

export default Modal;
