import React from 'react';
import PropTypes from 'prop-types';

/**
 * The select tag that will display all options with specific value and text.
 * This will also handle error display for the select tag, as well as any
 * onChange function if defined.
 */
const SelectInput = ({name, label, onChange, defaultOption, value, error, options}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name}
              value={value}
              onChange={onChange}>
        <option value="">{defaultOption}</option>
        {options.map((option => {
          return <option key={option.value} value={option.value}>{option.text}</option>;
        }))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;
