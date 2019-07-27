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
    // Waves - Get Cursor Position
    const cursorPos = {
      top: e.clientY,
      left: e.clientX,
      time: Date.now() // time indicates particular clicks
    };
    this.setState({ cursorPos });
  };

  render() {
    const {
      nav, className, ratio, type, noText
    } = this.props;

    return (
      <NavLink
        to={nav.url}
        key={nav.text}
        exact
        activeClassName="active"
        className={`nav-icon-link ${className || ''}`}
        title={nav.text}
        {...this.props}
        onMouseUp={this.handleClick}
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
