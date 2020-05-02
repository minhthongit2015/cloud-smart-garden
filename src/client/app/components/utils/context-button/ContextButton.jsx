import React from 'react';
import {
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact';
import classnames from 'classnames';
import { IconMore } from '../../../../assets/icons';
import BaseComponent from '../../_base/BaseComponent';


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
    const {
      className, options, color = '#fff', icon, noShadow, ...restProps
    } = this.props;

    return (
      <MDBDropdown dropright>
        <MDBDropdownToggle
          color="link"
          className={classnames(
            'p-0 btn-paper rounded-circle highlight-style',
            {
              'shadow-style': !noShadow
            },
            className
          )}
          style={{ width: '25px', height: '25px', color }}
        >
          {icon || <IconMore color={color} {...restProps} />}
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
