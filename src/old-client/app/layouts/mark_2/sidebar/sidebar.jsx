import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.scss';

export default class Sidebar extends Component {
  constructor() {
    super();
    this.links = [
      { type: 'url', url: '/', text: 'Trang Chủ' },
      { type: 'url', url: '/AI-ML-Manager', text: 'Quản Lý AI/ML (Admin)' },
      { type: 'url', url: '/user-network', text: 'Mạng Lưới Người dùng' },
      { type: 'url', url: '/my-garden', text: 'Quản Lý Vườn' },
      { type: 'separator' }
    ];
  }

  render() {
    return (
      <React.Fragment>
        <aside className="d-flex flex-column modern-scrollbar">
          {
            this.links.map(link => {
              if (link.type === 'url')
                return <NavLink to={link.url} key={link.url} exact activeClassName='active'>{link.text}</NavLink>;
              if (link.type === 'separator')
                return <hr key="Z" />;
              return null;
            })
          }
        </aside>
      </React.Fragment>
    );
  }
}
