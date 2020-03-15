import React from "react";
import PropTypes from "prop-types";

function TextInput(props) {
  let wrapperClass = "form-group";
  let inputClass = "form-control";
  if (props.error.length > 0) {
    inputClass += " has-error"
  }
  if (props.isCol === "true") {
    wrapperClass += " col";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <input
          id={props.id}
          type={props.type}
          onChange={props.onChange}
          name={props.name}
          className={inputClass}
          value={props.value}
        />
      </div>
      {props.error && <div className="alert alert-secondary" style={{opacity: 0.8}}>{props.error}</div>}
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string
};

TextInput.defaultProps = {
  error: "",
  type: "text"
};

export default TextInput;
