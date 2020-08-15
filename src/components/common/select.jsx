import React from "react";
const Select = ({ name, label, options, error, onChange ,value}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        name={name}
        id={name}
        value = {value}
        onChange={onChange}
      >
        <option value=" " />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
        ;
      </select>
      {error && (
        <button className="alert alert-danger btn-sm mt-1">{error} </button>
      )}
    </div>
  );
};

export default Select;
