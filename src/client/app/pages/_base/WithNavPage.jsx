import React from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse,
  MDBNavbarNav, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownToggle,
  MDBDropdownMenu, MDBDropdownItem, MDBFormInline
} from 'mdbreact';
import BasePage from './BasePage';
import './WithNavPage.scss';


export default class extends BasePage {
  constructor(props, ...args) {
    super(props, ...args);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.navs = [
      'Home', 'Features', 'Pricing'
    ];
    this.state = {
      isOpenNavbar: false,
      brand: 'Beyond Garden'
    };
  }

  toggleCollapse() {
    this.setState(prevState => ({ isOpenNavbar: !prevState.isOpenNavbar }));
  }

  renderBrand() {
    return (
      <MDBNavbarBrand>
        <strong>{this.state.brand}</strong>
      </MDBNavbarBrand>
    );
  }

  renderToggler() {
    return <MDBNavbarToggler onClick={this.toggleCollapse} />;
  }

  // eslint-disable-next-line class-methods-use-this
  renderLeftNavbar() {
    return (
      <MDBNavbarNav left>
        {this.navs.map((nav, index) => (
          <MDBNavItem active={index === 0}>
            <MDBNavLink to="#!">{nav}</MDBNavLink>
          </MDBNavItem>
        ))}
      </MDBNavbarNav>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderRightNavbar() {
    return (
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBFormInline waves>
            <div className="md-form my-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Tìm kiếm" aria-label="Search" />
            </div>
          </MDBFormInline>
        </MDBNavItem>
        {/* <MDBNavItem>
          <MDBDropdown>
            <MDBDropdownToggle nav caret>
              <span className="mr-2">Dropdown</span>
            </MDBDropdownToggle>
            <MDBDropdownMenu right flip>
              <MDBDropdownItem href="#!">Action</MDBDropdownItem>
              <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
              <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
              <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem> */}
      </MDBNavbarNav>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderBody() {
    return (
      [...new Array(100)].map(() => <div className="m-5">hello</div>)
    );
  }

  render() {
    return (
      <div className="with-nav-page">
        <div className="with-nav-page__body modern-scrollbar">
          <MDBNavbar color="indigo" dark expand="md" className="default-color">
            {this.renderBrand()}
            {this.renderToggler()}
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpenNavbar} navbar>
              {this.renderLeftNavbar()}
              {this.renderRightNavbar()}
            </MDBCollapse>
          </MDBNavbar>
          {this.renderBody()}
        </div>
      </div>
    );
  }
}
