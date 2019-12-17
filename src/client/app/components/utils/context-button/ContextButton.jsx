import React from 'react';
import {
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact';
import { IconMore } from '../../../../assets/icons';
import { getAutoDispatcher } from '../../Helper';


export default (props) => {
  const { options, handler, ...restProps } = props;
  const autoDispatcher = getAutoDispatcher(props);

  return (
    <MDBDropdown dropright>
      <MDBDropdownToggle
        floating
        color="link"
        className="p-0 btn-paper rounded-circle shadow-style highlight-style"
        style={{ width: '25px', height: '25px' }}
      >
        <IconMore color="#fff" {...restProps} />
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        {options && options.map(option => (
          <MDBDropdownItem
            key={option.value}
            onClick={event => autoDispatcher(event, option)}
          >
            {option.label}
          </MDBDropdownItem>
        ))}
        {/* <MDBDropdownItem divider />
        <MDBDropdownItem>Separated link</MDBDropdownItem> */}
      </MDBDropdownMenu>
    </MDBDropdown>
  );
};
