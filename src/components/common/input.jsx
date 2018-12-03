import React from "react";

const Input = ({ name, label, value, onChange, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        type={type || "text"}
        className="form-control"
      />
    </div>
  );
};

export default Input;
