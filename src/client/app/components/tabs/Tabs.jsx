/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  MDBNav, MDBNavItem, MDBNavLink, MDBTabPane, MDBTabContent
} from 'mdbreact';
import './Tabs.scss';
import classnames from 'classnames';
import Tab from './Tab';
import TabHeader from './TabHeader';
import TabBody from './TabBody';
import UISounds from '../../../assets/sounds/UISounds';
import BaseComponent from '../_base/BaseComponent';


export default class extends BaseComponent.Pure {
  getTabId(tabIndex) {
    return `${this.id}-${tabIndex}`;
  }

  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.tabHeaders = [];
    this.tabBodies = [];
    this.state = {
      activeItem: this.getTabId(props.tabIndex || 0)
    };
  }

  toggleTab(event) {
    UISounds.tabChange();
    const { currentTarget: { name: tabIndex, id: tabId } } = event;
    if (this.state.activeItem !== tabId) {
      this.setState({
        activeItem: tabId
      }, () => {
        this.dispatchEvent({ typez: 'change' }, +tabIndex, tabId);
      });
    }
  }

  buildTabHeader(tabHeader, tabIndex) {
    const tabId = this.getTabId(tabIndex);
    return (
      <li key={tabId} className="nav-item">
        <a
          href="#"
          className={classnames(
            'nav-link Ripple-parent',
            {
              active: this.state.activeItem === tabId
            }
          )}
          name={tabIndex}
          id={tabId}
          onClick={this.toggleTab}
          role="tab"
        >
          {tabHeader}
        </a>
      </li>
    );
  }

  buildTabBody(tabBody, tabIndex) {
    const tabId = this.getTabId(tabIndex);
    return (
      <MDBTabPane key={tabId} tabId={tabId} role="tabpanel">
        {tabBody}
      </MDBTabPane>
    );
  }

  render() {
    this.tabHeaders = [];
    this.tabBodies = [];
    if (!this.tabHeaders.length) {
      React.Children.forEach(this.props.children,
        (tab, tabIndex) => {
          if (tab.type === Tab) {
            React.Children.forEach(tab.props.children,
              (tabChild) => {
                if (tabChild.type === TabHeader) {
                  this.tabHeaders.push(this.buildTabHeader(tabChild, tabIndex));
                }
                if (tabChild.type === TabBody) {
                  this.tabBodies.push(this.buildTabBody(tabChild, tabIndex));
                }
              });
          }
          // return React.cloneElement(child, { doSomething: this.doSomething })
        });
    }

    return (
      <div className="tabs">
        <MDBNav className="nav-tabs">
          {this.tabHeaders.map(tabHeader => tabHeader)}
        </MDBNav>
        <MDBTabContent activeItem={this.state.activeItem}>
          {this.tabBodies.map(tabContent => tabContent)}
        </MDBTabContent>
      </div>
    );
  }
}
