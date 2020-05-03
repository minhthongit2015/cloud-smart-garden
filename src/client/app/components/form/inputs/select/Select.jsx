import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();


export default ({
  className, style, id, key,
  name, value, defaultValue, onChange,
  options, isMulti, required,
  placeholder, autoComplete = 'off', autofill = 'off',
  ...restProps
}) => (
  <Select
    key={key}
    id={id}
    className={className}
    style={style}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    options={options}
    isMulti={isMulti}
    defaultValue={defaultValue}
    required={required}
    autoComplete={autoComplete}
    autofill={autofill}
    components={animatedComponents}
    {...restProps}
  />
);
