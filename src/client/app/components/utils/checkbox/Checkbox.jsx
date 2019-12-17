import React from 'react';
import PropTypes from 'prop-types';
import { IconCheckbox } from '../../../../assets/icons';
import './Checkbox.scss';

const Checkbox = React.memo((props) => {
  const {
    children, label, checked, className, ...restProps
  } = props;
  return (
    <label className={`my-checkbox ${className || ''}`}>
      <input type="checkbox" checked={checked} {...restProps} style={{ display: 'none' }} />
      <div className="my-checkbox__label">
        <IconCheckbox checked={checked} width="20px" height="20px" /> {children || label }
      </div>
    </label>
  );
});

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.any,
  children: PropTypes.any,
  checked: PropTypes.bool
};

Checkbox.defaultProps = {
  name: '',
  label: null,
  children: null,
  checked: false
};

export default Checkbox;
