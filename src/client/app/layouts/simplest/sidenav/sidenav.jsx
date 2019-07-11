import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './sidenav.scss';

export default class Sidebar extends Component {
  constructor() {
    super();
    this.links = [
      { type: 'url', url: '/', text: 'Trang Chủ' },
      { type: 'url', url: '/ai-cloud', text: 'Quản Lý AI/ML (Admin)' },
      { type: 'url', url: '/my-garden', text: 'Quản Lý Vườn' },
      { type: 'url', url: '/smile-city', text: 'Mạng Lưới Người dùng' },
      { type: 'separator' }
    ];
  }

  render() {
    return (
      <aside className="d-flex flex-column modern-scrollbar">
        {
          this.links.map((link) => {
            if (link.type === 'url') { return <NavLink to={link.url} key={link.url} exact activeClassName="active">{link.text}</NavLink>; }
            if (link.type === 'separator') { return <hr key="Z" />; }
            return null;
          })
        }
      </aside>
    );
  }
}
