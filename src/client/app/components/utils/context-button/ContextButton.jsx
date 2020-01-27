import React from 'react';
import {
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact';
import { IconMore } from '../../../../assets/icons';
import BaseComponent from '../../BaseComponent';


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.bind(this.handleOptionSelect);
  }

  handleOptionSelect(event) {
    this.stopEvent(event);
    const { options = [] } = this.props;
    const { target: { value } } = event;
    const option = options.find(opt => opt.value === value);
    this.dispatchEvent(this.Events.select, option);
  }

  render() {
    const { options, handler, ...restProps } = this.props;

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
              value={option.value}
              onClick={this.handleOptionSelect}
            >
              {option.label}
            </MDBDropdownItem>
          ))}
          {/* <MDBDropdownItem divider />
          <MDBDropdownItem>Separated link</MDBDropdownItem> */}
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }
}
