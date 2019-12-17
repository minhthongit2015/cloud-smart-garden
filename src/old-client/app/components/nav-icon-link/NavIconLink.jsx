import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { MDBWaves } from 'mdbreact';
import './NavIconLink.scss';
import FixedRatioImage from '../fixed-ratio-image/FixedRatioImage';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorPos: {}
    };
  }

  handleClick = (e) => {
    e.stopPropagation();
    const cursorPos = {
      top: e.clientY,
      left: e.clientX,
      time: Date.now()
    };
    this.setState({ cursorPos });
  };

  render() {
    const {
      nav, className, ratio, type, noText
    } = this.props;

    return (
      <NavLink
        {...this.props}
        to={nav.link}
        key={nav.text}
        activeClassName="active"
        className={`nav-icon-link ${className || ''}`}
        title={nav.text}
        onMouseDown={this.handleClick}
        onTouchStart={this.handleClick}
      >
        <FixedRatioImage
          src={nav.iconSrc}
          ratio={ratio || 0.65}
          type={type || 'contain'}
        />
        {!noText && <span>{nav.text}</span>}
        <MDBWaves cursorPos={this.state.cursorPos} />
      </NavLink>
    );
  }
}
