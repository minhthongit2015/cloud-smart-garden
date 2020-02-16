/* eslint-disable class-methods-use-this */
import React from 'react';
import BaseComponent from '../../_base/BaseComponent';


export default class Toggleable extends BaseComponent.Pure {
  get isOpen() {
    return this.state && this.state.isOpen;
  }

  get isReallyClosed() {
    return this.state && !this.state.isOpen && !this.isClosing;
  }

  constructor(props) {
    super(props);
    this.bind(
      this.open, this.close, this.toggle,
      this.handleOpen, this.handleClose, this.handleToggle,
      this.handleClosed
    );
    this.TRANSITION_DURATION = 300;
    this.isClosing = false;
    this.state = {
      isOpen: false
    };
  }

  open(...args) {
    if (this.isOpen) return;
    this.toggle(...args);
  }

  close(...args) {
    if (!this.isOpen) return;
    this.toggle(...args);
  }

  toggle() {
    this.setState(
      prevState => ({ isOpen: !prevState.isOpen }),
      this.handleToggle
    );
  }

  handleOpen() {
    this.isClosing = false;
    this.dispatchEvent(this.Events.open);
  }

  handleClose() {
    this.isClosing = true;
    setTimeout(this.handleClosed, this.TRANSITION_DURATION);
    this.dispatchEvent(this.Events.close);
  }

  handleClosed() {
    this.isClosing = false;
    this.forceUpdate();
  }

  handleToggle() {
    this.isClosing = false;
    this.dispatchEvent(this.Events.toggle, this.state.isOpen);
    if (this.isOpen) {
      this.handleOpen();
    } else {
      this.handleClose();
    }
  }

  // Demo usage
  render() {
    return (
      <div>
        <button type="button" onClick={this.open}>Open</button>
        <button type="button" onClick={this.close}>Close</button>
        <button type="button" onClick={this.toggle}>Toggle</button>
      </div>
    );
  }
}
