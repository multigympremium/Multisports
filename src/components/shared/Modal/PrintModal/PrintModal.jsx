import React, { useEffect, useRef } from "react";

function PrintModal({ isShowModal, children, setIsShowModal, resetPrintData }) {
  const modalElem = useRef(null);

  useEffect(() => {
    if (!isShowModal) {
      modalElem.current.scrollTop = 0;
    }
  }, [isShowModal]);
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen grid place-items-center z-[9999] bg-black bg-opacity-50 overflow-auto transition-all duration-500 ${
        isShowModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      ref={modalElem}
    >
      <div
        className="w-full h-full absolute top-0 left-0 z-[-1]"
        onClick={() => {
          setIsShowModal(false);
          resetPrintData();
        }}
      ></div>
      {children}
    </div>
  );
}

export default PrintModal;
