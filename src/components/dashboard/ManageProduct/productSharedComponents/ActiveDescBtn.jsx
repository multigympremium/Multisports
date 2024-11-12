import React from "react";

function ActiveDescBtn({
  activeDescription,
  setActiveDescription,
  desc_name,
  btnName,
}) {
  return (
    <button
      type="button"
      className={`border border-black ${
        activeDescription === desc_name ? "bg-neutral-800 text-white" : ""
      } px-4 py-2 rounded-md hover:bg-neutral-800 hover:text-white`}
      onClick={() => setActiveDescription(desc_name)}
    >
      {btnName}
    </button>
  );
}

export default ActiveDescBtn;
