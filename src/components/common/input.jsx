import React from "react";
const Input = (props) => {
  const { value, onChange, name, label, type, error } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        autoFocus={name == "username" ? true : false}
        className="form-control"
        id={name}
      />
      {error && <button className="alert alert-danger btn-sm mt-1">{error} </button>}
    </div>
  );
};

export default Input;
