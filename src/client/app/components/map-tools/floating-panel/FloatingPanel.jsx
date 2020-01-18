/* eslint-disable getter-return */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { MDBBtn, MDBTooltip } from 'mdbreact';
import classnames from 'classnames';
import './FloatingPanel.scss';
import { IconPlus } from '../../../../assets/icons';
import BaseComponent from '../../BaseComponent';


export default class extends BaseComponent.Pure {
  get title() {
    return this.props.title || 'Tin tức mới';
  }

  get titleColor() {
    return '';
  }

  get width() {
    return this.props.width || '300px';
  }

  get height() {
    return this.props.height || 'calc(100% - 34px)';
  }

  get top() { return this.props.top || '10px'; }

  get right() { return this.props.right || '60px'; }

  get botton() { return this.props.botton || 'initial'; }

  get left() { return this.props.left || 'initial'; }

  get toggleIcon() {
    return <IconPlus width="100%" height="100%" />;
  }

  constructor(props) {
    super(props);
    this.bind(
      this.toggle, this.open, this.close, this.focus, this.unfocus,
      this.handleTransitionEnd, this.handleClick
    );
    const isOpen = this.props.open != null ? this.props.open : false;
    this.state = {
      isOpen,
      isFocus: isOpen
    };
  }

  open(event) {
    this.stopEvent(event);
    if (this.state.isOpen) {
      return;
    }
    this.setState({
      isOpen: true,
      isFocus: true,
      overflow: false
    }, () => {
      this.dispatchEvent(this.Events.open, this);
    });
  }

  close(event) {
    this.stopEvent(event);
    if (!this.state.isOpen) {
      return;
    }
    this.setState({
      isOpen: false,
      isFocus: false,
      overflow: false
    }, () => {
      this.dispatchEvent(this.Events.close, this);
    });
  }

  toggle(event) {
    this.stopEvent(event);
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      isFocus: !prevState.isOpen,
      overflow: false
    }), () => {
      const eventToDispatch = this.state.isOpen ? this.Events.open : this.Events.close;
      this.dispatchEvent(eventToDispatch, this);
    });
  }

  focus(event) {
    this.stopEvent(event);
    this.setState({
      isFocus: true
    });
  }

  unfocus() {
    this.setState({
      isFocus: false
    });
  }

  handleTransitionEnd() {
    this.setState(prevState => ({
      overflow: prevState.isOpen
    }));
  }

  handleClick() {
    this.focus();
    this.dispatchEvent(this.Events.click, this);
  }

  renderHeader() {
    const { isOpen, overflow } = this.state;
    return (
      <div className="d-flex justify-content-end align-items-center">
        {isOpen && (
          <div className="floating-panel__title mx-2" style={{ color: this.titleColor }}>
            {this.title}
          </div>
        )}
        <MDBTooltip placement="bottom" isVisible={overflow ? undefined : false}>
          <MDBBtn
            className="floating-panel__toggle floating-panel__btn"
            color="none"
            onClick={this.toggle}
          >
            {this.toggleIcon}
          </MDBBtn>
          <div className="text-center text-nowrap">
            {this.title}
            <div className="mb-1">(<kbd>Shift</kbd> + <kbd>Tab</kbd>)</div>
          </div>
        </MDBTooltip>
      </div>
    );
  }

  renderContent() {
    return (
      this.props.children
    );
  }

  render() {
    const { className, style, small } = this.props;
    const { isOpen, isFocus, overflow } = this.state;
    const wrapperStyle = {
      ...style,
      top: this.top,
      right: this.right,
      bottom: this.botton,
      left: this.left,
      maxWidth: isOpen ? this.width : '',
      maxHeight: isOpen ? this.height : ''
    };

    return (
      <div
        className={classnames(
          'floating-panel',
          className,
          {
            open: isOpen,
            'overflow-visible': overflow,
            sm: small,
            focus: isFocus
          }
        )}
        style={wrapperStyle}
        onTransitionEnd={this.handleTransitionEnd}
        onClick={this.handleClick}
      >
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}
