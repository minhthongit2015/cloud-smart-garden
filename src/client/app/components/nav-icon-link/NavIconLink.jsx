import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavIconLink.scss';

export default props => (
  <NavLink
    to={props.nav.url}
    key={props.nav.url}
    exact
    activeClassName="active"
    className="nav-icon-link waves-effect waves-light"
    title={props.nav.text}
  >
    {props.noIcon ? null : <props.nav.icon draggable={false} />}
    <span>{props.nav.text}</span>
  </NavLink>
);
