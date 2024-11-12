import React from "react";
import Switch from "react-switch";
function SwitchInput({ label, checked, setChecked }) {
  return (
    <div className="mb-4 flex items-center">
      <label className="block text-gray-700 font-bold mr-2">{label}</label>
      <Switch
        checked={checked}
        onChange={setChecked}
        offColor="#ccc"
        onColor="#00b894"
      />
    </div>
  );
}

export default SwitchInput;
