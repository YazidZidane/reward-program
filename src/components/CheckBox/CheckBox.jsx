import React from "react";

import "./CheckBox.css";

export default function CheckBox({ children, name, label, onChange, checked }) {
  return (
    <div className={`selection-bar__checkbox ${checked ? "checked" : ""}`}>
      <label>
        <input
          name={name}
          type="checkbox"
          onChange={onChange}
          checked={checked}
        />
        {label}
      </label>
      {children}
    </div>
  );
}
