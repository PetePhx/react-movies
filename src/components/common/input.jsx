import React from "react";

const Input = ({ name, label, value, onChange, type, autoFocus, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        type={type || "text"}
        autoFocus={autoFocus || false}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
