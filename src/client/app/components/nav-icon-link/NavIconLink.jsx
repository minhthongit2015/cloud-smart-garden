import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavIconLink.scss';
import FixedRatioImage from '../fixed-ratio-image/FixedRatioImage';

export default props => (
  <NavLink
    to={props.nav.url}
    key={props.nav.text}
    exact
    activeClassName="active"
    className={`nav-icon-link ${props.className || ''}`}
    title={props.nav.text}
    {...props}
  >
    <FixedRatioImage
      src={props.nav.iconSrc}
      ratio={props.ratio || 0.65}
      type={props.type || 'contain'}
      className="waves-effect waves-light"
    />
    {!props.noText && <span className="waves-effect waves-light">{props.nav.text}</span>}
  </NavLink>
);
