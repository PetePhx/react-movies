import React from "react";

const Select = ({ name, label, value, error, values, titles, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value || ""}
        {...rest}
        className="form-control"
      >
        <option value="" disabled>
          Select One:
        </option>
        {values.map((val, idx) => {
          return (
            <option key={idx} value={val}>
              {titles[idx]}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
