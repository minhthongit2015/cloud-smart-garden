import React from 'react';
import Content from './content/content';
import SideNav from './sidenav/sidenav';
import RouteConstants from '../../utils/RouteConstants';
import './simplest.scss';


export default ({ routes }) => (
  <div className="simplest-layout simplest-theme d-flex flex-column flex-sm-row h-100">
    <Content>
      {routes}
    </Content>
    <SideNav hide={window.location.pathname === RouteConstants.homeLink} />
  </div>
);
