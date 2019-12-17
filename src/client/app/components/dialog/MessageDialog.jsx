import React from 'react';
import {
  MDBModal, MDBModalBody,
  MDBWaves
} from 'mdbreact';
import LeafLoading from '../utils/loadings/LeafLoading';

export default class extends React.Component {
  get isOpen() { return this.state.isShowModal; }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      cursorPos: {},
      isShowModal: false,
      disabled: false,
      renderContent: null,
      title: '❝Climate Strike Vietnam❞'
    };
  }

  handleClick = (e) => {
    e.stopPropagation();
    const cursorPos = { top: e.clientY, left: e.clientX, time: Date.now() };
    this.setState({ cursorPos });
  };

  open() {
    if (this.isOpen) return;
    this.toggle();
  }

  close() {
    if (!this.isOpen) return;
    this.toggle();
  }

  toggle() {
    if (this.state.disabled) {
      return;
    }
    this.setState({
      isShowModal: !this.isOpen
    });
  }

  show(title, renderContent) {
    this.setState({
      renderContent,
      title
    }, () => this.open());
  }

  render() {
    const {
      renderContent, title,
      isShowModal, disabled,
      color = 'deep-blue-gradient'
    } = this.state;

    return (
      <MDBModal
        isOpen={isShowModal}
        toggle={this.toggle}
        className=""
        style={{ position: 'relative' }}
        disabled={disabled}
      >
        <div
          className={`modal-header justify-content-center mb-3 p-4 waves-effect ${color}`}
          onMouseDown={this.handleClick}
          onTouchStart={this.handleClick}
        >
          <h5 className="white-text font-weight-bolder m-0">{title}</h5>
          <MDBWaves
            cursorPos={this.state.cursorPos}
          />
        </div>
        <MDBModalBody>
          {renderContent && renderContent()}
        </MDBModalBody>
        <LeafLoading overlaping={disabled} text="đang thực hiện thao tác..." />
      </MDBModal>
    );
  }
}
