/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  MDBModal, MDBModalBody
} from 'mdbreact';
import classNames from 'classnames';
import BaseDialog from './BaseDialog';
import HistoryHelper from '../../helpers/HistoryHelper';


export default class extends BaseDialog {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      content: props.content,
      url: props.url,
      title: props.title
    };
  }

  open(...args) {
    const { url, data: state, title } = this.state;
    if (this.isOpen) {
      HistoryHelper.replace(url, state, title);
    } else {
      HistoryHelper.push(url, state, title, true);
    }
    super.open(...args);
  }

  show(state, url, title) {
    this.setState({
      url, data: state, title
    }, this.open);
  }

  setContent(content, url, title) {
    this.setState({ content, url, title }, this.open);
  }

  handleClose() {
    super.handleClose();
    HistoryHelper.back(true);
  }

  renderBody() {
    const { content } = this.state;
    return (
      <MDBModalBody>
        {content}
      </MDBModalBody>
    );
  }

  render() {
    return (
      <MDBModal
        id={this.id}
        isOpen={this.isOpen}
        toggle={this.toggle}
        className={classNames({
          locked: this.locked
        })}
        style={{ position: 'relative' }}
        disabled={this.disabled}
        size="xl"
      >
        {this.renderBody()}
      </MDBModal>
    );
  }
}
