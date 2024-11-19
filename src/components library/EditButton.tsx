import React from "react";
import { FiEdit } from "react-icons/fi";

const EditButton = ({ onClick }) => {
  return (
    <button
      className="text-[#2E3190] border p-2 rounded-xl transition ease-in-out duration-300 hover:text-white hover:bg-[#2E3190]"
      onClick={onClick}
    >
      <FiEdit className="text-lg" />
    </button>
  );
};

export default EditButton;
