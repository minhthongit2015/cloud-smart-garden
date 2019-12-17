import React from 'react';
import {
  MDBDropdown, MDBDropdownToggle, DropdownMenu, DropdownItem
} from 'mdbreact';
import classnames from 'classnames';
import './MapContextMenu.scss';


export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.dropdownRef = null;
    this.handleOnDropdownRef = this.handleOnDropdownRef.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.state = {
      isOpen: false,
      clientX: 0,
      clientY: 0,
      data: null
    };
  }

  handleOnDropdownRef(ref) {
    this.dropdownRef = ref;
    if (!ref || (ref && ref._toggle)) {
      return;
    }
    ref._toggle = ref.toggle;
    ref.toggle = (...args) => {
      if (!ref.state.isOpen) {
        this.handleOpenMenuContext();
      } else {
        this.handleCloseMenuContext();
      }
      ref._toggle(...args);
    };
  }

  handleOpenMenuContext() {
    this.setState({
      isOpen: true
    });
  }

  handleCloseMenuContext() {
    this.setState({
      isOpen: false
    });
  }

  handleSelection(event) {
    if (this.props.handler) {
      this.props.handler(event, {
        value: event.target.value,
        label: event.target.label
      }, this.state.data);
    }
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

  render() {
    const { clientX, clientY, isOpen } = this.state;
    const { options } = this.props;

    return (
      <div
        className={classnames('context-menu', { open: isOpen })}
        style={{ top: clientY - 2.5, left: clientX - 2.5 }}
      >
        <MDBDropdown ref={this.handleOnDropdownRef} isOpen={isOpen} dropright>
          <MDBDropdownToggle className="context-menu__point"><i className="fas fa-times" /></MDBDropdownToggle>
          <DropdownMenu>
            {options.map(option => (
              <DropdownItem
                key={option.value}
                label={option.label}
                value={option.value}
                onClick={this.handleSelection}
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
