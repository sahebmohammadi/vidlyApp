import React, { Component } from "react";
import Joi from "joi-browser";
import Input from './input';
import Select from './select';
class Form extends Component {
  state = {
    data: {},
    error: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    const errors = {};
    if (!result.error) return null;
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;

    // const { data } = this.state;
    // const errors = {};
    // if (data[name].trim() == "")
    //   errors[name] = "Username is required.";
    // if (data.password.trim() == "")
    //   errors.password = "Password is required.";
    // return Object.keys(errors).length == 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const result = Joi.validate(obj, schema, { abortEarly: false });
    return result.error === null ? null : result.error.details[0].message;
    // console.log(result);
    // if (!result.error) return null
    // return result.error.details[0].message;

    // if (name === "username") {
    //   if (value.trim() === "") return "Username is required";
    // }
    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required";
    // }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderInput = (name, label,type ="text") => {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[name]}
        name={name}
        type={type}
        onChange={this.handleChange}
        label={label}
        error={errors[name]}
      />
    );
  };
  renderSelect = (name,label,options,type ="text")=>{
    const { data, errors } = this.state;
    return (
      <Select
        value={data[name]}
        name={name}
        type={type}
        onChange={this.handleChange}
        label={label}
        error={errors[name]}
        options = {options}
      />
    );

  }
}

export default Form;
