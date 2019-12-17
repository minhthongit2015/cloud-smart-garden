import React from 'react';
import {
  MDBModal, MDBModalBody
} from 'mdbreact';
import BasePage from '../../pages/_base/BasePage';


export default class extends BasePage {
  get isOpen() { return this.state.isShowLoginModal; }

  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isShowLoginModal: false
    };
  }

  pushHistory({ state, title, url }) {
    window.history.pushState(state, title, url);
    this.historyBack = true;
    this.historyPrevTitle = document.title;
    document.title = title;
  }

  replaceHistory({ state, title, url }) {
    window.history.replaceState(state, title, url);
    this.historyPrevTitle = document.title;
    document.title = title;
  }

  setContent(content) {
    this.setState({
      content
    });
  }

  open() {
    if (this.isOpen) return;
    this.toggle();
  }

  close(noBack) {
    if (!this.isOpen) return;
    this.toggle(noBack);
  }

  toggle(noBack) {
    if (this.state.disabled) return;
    if (this.isOpen) {
      if (noBack) {
        this.historyBack = false;
      }
      if (this.historyBack) {
        this.historyBack = false;
        window.history.back();
      } else {
        const { location } = window;
        const parentUrl = `${location.origin}${location.pathname}`;
        window.history.pushState(undefined, '', parentUrl);
      }
      if (this.historyPrevTitle) {
        document.title = this.historyPrevTitle;
        this.historyPrevTitle = null;
      }
    }
    this.setState({
      isShowLoginModal: !this.isOpen
    });
  }

  render() {
    const { isShowLoginModal, content } = this.state;
    return (
      <MDBModal
        isOpen={isShowLoginModal}
        toggle={this.toggle}
        style={{ position: 'relative' }}
        size="xl"
        id="page-dialog-instance"
      >
        <MDBModalBody>
          {content}
        </MDBModalBody>
      </MDBModal>
    );
  }
}
