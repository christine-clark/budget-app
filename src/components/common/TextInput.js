import React from 'react';
import PropTypes from 'prop-types';

/**
 * The input tag that will display all text input fields with specific value and text.
 * This will also handle error display for the input tag, as well as any
 * onChange function if defined.
 */
const TextInput = ({name, label, onChange, placeholder, value, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += ' ' + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <input type="text"
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
