import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      name="search"
      placeholder="Search..."
      className="form-control my-3"
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
