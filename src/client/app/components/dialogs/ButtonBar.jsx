import React from 'react';
import { MDBBtn } from 'mdbreact';
import classnames from 'classnames';
import './ButtonBar.scss';
import BaseComponent from '../BaseComponent';


export default class extends BaseComponent.Pure {
  render() {
    const {
      size = 30,
      minimizeState = 1, closeState = 1,
      minimizeTitle = 'Mở rộng', closeTitle = 'Bài viết mới',
      minimizeTitle2 = 'Thu gọn', closeTitle2 = 'Đóng'
    } = this.props;
    const btnStyle = {
      width: `${size}px`,
      height: `${size}px`,
      fontSize: `${size * 0.5}px`,
      lineHeight: `${size * 0.5}px`
    };

    return (
      <div className="btn-bar my-2">
        <MDBBtn
          name="minimize"
          title={minimizeState === 2 ? minimizeTitle : minimizeTitle2}
          onClick={this.dispatchEvent}
          className={classnames(
            'btn-bar__btn rounded mr-2',
            { state2: minimizeState === 2 }
          )}
          style={btnStyle}
        >
          <i className="fas fa-minus" />
        </MDBBtn>
        <MDBBtn
          name="close"
          title={closeState === 2 ? closeTitle : closeTitle2}
          onClick={this.dispatchEvent}
          className={classnames(
            'btn-bar__btn rounded',
            { state2: closeState === 2 }
          )}
          style={btnStyle}
        >
          <i className="fas fa-times" />
        </MDBBtn>
      </div>
    );
  }
}
