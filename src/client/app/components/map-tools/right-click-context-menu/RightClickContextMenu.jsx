import React from 'react';
import {
  MDBDropdown, MDBDropdownToggle, DropdownMenu, DropdownItem
} from 'mdbreact';
import classnames from 'classnames';
import BaseComponent from '../../_base/BaseComponent';
import './RightClickContextMenu.scss';


export default class extends BaseComponent.Pure {
  constructor(props) {
    super(props);
    this.dropdownRef = null;
    this.bind(this.handleDropdownRef, this.handleSelect);
    this.state = {
      isOpen: false,
      clientX: 0,
      clientY: 0,
      data: null // the additional data attached to the context menu
    };
  }

  open(event, data) {
    if (event) {
      const { clientX, clientY } = event;
      this.setState({
        clientX,
        clientY,
        data,
        isOpen: true
      });
    }
    if (!this.dropdownRef.state.isOpen) {
      this.dropdownRef.toggle();
    }
  }

  handleDropdownRef(ref) {
    this.dropdownRef = ref;
    if (!ref || (ref && ref._toggle)) {
      return;
    }
    ref._toggle = ref.toggle;
    ref.toggle = (...args) => {
      if (!ref.state.isOpen) {
        this.handleOpenContextMenu();
      } else {
        this.handleCloseContextMenu();
      }
      ref._toggle(...args);
    };
  }

  handleOpenContextMenu() {
    this.setState({
      isOpen: true
    });
  }

  handleCloseContextMenu() {
    this.setState({
      isOpen: false
    });
  }

  handleSelect(event) {
    const option = {
      value: event.target.value,
      label: event.target.label
    };
    this.dispatchEvent(this.Events.select, option, this.state.data);
  }

  render() {
    const { clientX, clientY, isOpen } = this.state;
    const { options } = this.props;

    return (
      <div
        className={classnames('context-menu', { open: isOpen })}
        style={{ top: clientY - 2.5, left: clientX - 2.5 }}
      >
        <MDBDropdown ref={this.handleDropdownRef} isOpen={isOpen} dropright>
          <MDBDropdownToggle className="context-menu__red-dot">
            <i className="fas fa-times" />
          </MDBDropdownToggle>
          <DropdownMenu>
            {options.map(option => (
              <DropdownItem
                key={option.value}
                label={option.label}
                value={option.value}
                onClick={this.handleSelect}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </MDBDropdown>
      </div>
    );
  }
}
