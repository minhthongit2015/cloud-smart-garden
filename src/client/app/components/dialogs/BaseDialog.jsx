/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  MDBModal, MDBModalBody,
  MDBWaves,
  MDBModalHeader
} from 'mdbreact';
import classNames from 'classnames';
import LeafLoading from '../utils/loadings/LeafLoading';
import Toggleable from '../utils/toggleable/Toggleable';
import './BaseDialog.scss';


export default class extends Toggleable {
  get disabled() {
    return this.state && this.state.disabled;
  }

  get locked() {
    return this.state && this.state.locked;
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      ...this.state,
      cursorPos: {},
      disabled: false,
      locked: false,
      renderContent: null,
      title: '❝Climate Strike Vietnam❞',
      data: props.data
    };
  }

  toggle() {
    if (this.disabled || this.locked) return;
    super.toggle();
  }

  show(title, renderContent) {
    this.setState({
      renderContent,
      title
    }, this.open);
  }

  disable() {
    this.setState({ disabled: true });
  }

  enable() {
    this.setState({ disabled: false });
  }

  lock() {
    this.setState({ locked: true });
  }

  unlock() {
    this.setState({ locked: false });
  }

  setData(data) {
    this.setState({ data });
  }

  componentDidMount() {
    if (this.props.open) {
      this.open();
    }
  }

  handleClick(event) {
    this.stopEvent(event);
    const cursorPos = { top: event.clientY, left: event.clientX, time: Date.now() };
    this.setState({ cursorPos });
  }

  renderHeader() {
    const { noHeader, wavesHeader } = this.props;
    if (noHeader) return null;
    return (
      wavesHeader ? (
        this.renderWavesHeader()
      ) : (
        this.renderNormalHeader()
      )
    );
  }

  renderWavesHeader() {
    const {
      color = 'deep-blue-gradient'
    } = this.state;
    return (
      <div
        className={`modal-header justify-content-center mb-3 p-4 waves-effect ${color}`}
        onMouseDown={this.handleClick}
        onTouchStart={this.handleClick}
      >
        {this.renderHeaderContent()}
        <MDBWaves
          cursorPos={this.state.cursorPos}
        />
      </div>
    );
  }

  renderNormalHeader() {
    return (
      <MDBModalHeader>
        {this.renderHeaderContent()}
      </MDBModalHeader>
    );
  }

  renderHeaderContent() {
    const { title } = this.state;
    return (
      <h5 className="white-text font-weight-bolder m-0">{title}</h5>
    );
  }

  renderBody() {
    const { renderContent } = this.state;
    return (
      <MDBModalBody>
        {renderContent && renderContent()}
      </MDBModalBody>
    );
  }

  renderFooter() {
    const { noFooter = true } = this.props;
    if (noFooter) return null;
    return 'Footer';
  }

  renderContent() {
    return (
      <React.Fragment>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
        <LeafLoading overlaping={this.disabled} text="đang thực hiện thao tác..." />
      </React.Fragment>
    );
  }

  render() {
    return (
      <MDBModal
        isOpen={this.isOpen}
        toggle={this.toggle}
        className={classNames({
          locked: this.locked
        })}
        style={{ position: 'relative' }}
        disabled={this.disabled}
      >
        {this.renderContent()}
      </MDBModal>
    );
  }
}
