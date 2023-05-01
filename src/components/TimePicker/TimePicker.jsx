import React from "react";

import "../../styles/TimePicker.css";

export const defaultTime = {
  min_date: "2023-01-01",
  max_date: "2023-04-27",
  min_month: "2023-01",
  max_month: "2023-04",
};

export default function TimePicker({ type, label, value, onChange, disabled }) {
  return (
    <div className="time-picker">
      <label>
        {label}
        <input
          type={type}
          value={disabled ? "" : value}
          min={type === "date" ? defaultTime.min_date : defaultTime.min_month}
          max={type === "date" ? defaultTime.max_date : defaultTime.max_month}
          onChange={onChange}
          disabled={disabled}
          data-testid="time-picker-input"
        />
      </label>
    </div>
  );
}
