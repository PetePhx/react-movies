import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error: err } = Joi.validate(this.state.data, this.schema, options);
    if (!err) return null;

    const errors = {};
    err.details.forEach(item => (errors[item.path] = item.message));
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton = label => {
    return (
      <button
        disabled={!!this.validate()}
        className="btn btn-primary"
        // onClick={this.handleSubmit}
      >
        {label}
      </button>
    );
  };

  renderInput = (name, label, options = {}) => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        type={options.type || "text"}
        autoFocus={options.autoFocus || false}
      />
    );
  };

  renderDropDownMenu = (name, label, values, titles) => {
    const { data } = this.state;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          value={data[name] || ""}
          className="form-control"
          onChange={this.handleChange}
        >
          <option value="" disabled>
            Select one:
          </option>
          {values.map((val, idx) => {
            return (
              <option key={idx} value={val}>
                {titles[idx]}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
}

export default Form;
