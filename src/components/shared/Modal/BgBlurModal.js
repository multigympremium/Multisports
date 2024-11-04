"use client";
function BgBlurModal({
  isShowModal,
  children,
  setIsShowModal,
  setFormIndex = () => {},
}) {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen grid place-items-center overflow-hidden py-6 z-[99] backdrop-blur-lg  bg-opacity-10 bg-black  transition-all duration-500 ${
        isShowModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        // added comment
        className="w-full h-full absolute top-0 left-0 z-[-1]"
        onClick={() => {
          setIsShowModal(false);
          setFormIndex(0);
        }}
      ></div>
      {children}
    </div>
  );
}

export default BgBlurModal;
