import React from "react";
const SearchBox = (props) => {
  const { value, onChange } = props;
  return (
    <input
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
    />
  );
};

export default SearchBox;
