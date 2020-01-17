/* eslint-disable getter-return */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { MDBBtn, MDBTooltip } from 'mdbreact';
import classnames from 'classnames';
import './FloatingPanel.scss';
import { IconPlus } from '../../../../assets/icons';
import BaseComponent from '../../BaseComponent';
import ItemList from '../toolbar-content/ItemList';


export default class extends BaseComponent.Pure {
  get title() {
    return this.props.title || 'Tin tức mới';
  }

  labelProvider(item) {
    return item.name;
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

  constructor(props) {
    super(props);
    this.bind(this.toggle, this.handleTransitionEnd);
    this.state = {
      isOpen: this.props.open != null ? this.props.open : true
    };
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      overflow: false
    }));
  }

  handleTransitionEnd() {
    this.setState(prevState => ({
      overflow: prevState.isOpen
    }));
  }

  renderHeader() {
    const { isOpen, overflow } = this.state;
    return (
      <div className="d-flex justify-content-end align-items-center">
        {isOpen && (
          <div className="floating-panel__title mx-2">{this.title}</div>
        )}
        <MDBTooltip placement="bottom" isVisible={overflow ? undefined : false}>
          <MDBBtn
            className="floating-panel__toggle floating-panel__btn"
            color="none"
            onClick={this.toggle}
          >
            {this.renderIcon()}
          </MDBBtn>
          <div className="text-center text-nowrap">
            {this.title}
            <div className="mb-1">(<kbd>Shift</kbd> + <kbd>Tab</kbd>)</div>
          </div>
        </MDBTooltip>
      </div>
    );
  }

  renderIcon() {
    return <IconPlus width="100%" height="100%" />;
  }

  renderContent() {
    const { items, onSelect } = this.props;
    return (
      <ItemList
        items={items}
        labelProvider={this.labelProvider}
        onSelect={onSelect}
      />
    );
  }

  render() {
    const { className, style, small } = this.props;
    const { isOpen, overflow } = this.state;
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
          { open: isOpen, 'overflow-visible': overflow, sm: small }
        )}
        style={wrapperStyle}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}
