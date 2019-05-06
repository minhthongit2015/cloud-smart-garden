import React, { Component } from 'react';
import './styles.scss';

export default class Dashboard extends Component {
  componentDidMount() {
    document.title = 'Home';
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <header className="text-center m-5">
            <img src="/img/Logo_IUH.png" height="100px" />
          </header>
          <h3 className="text-center" style={{ fontWeight: 'bold' }}>
            XÂY DỰNG HỆ THỐNG THÔNG MINH
            <br />
            GIÁM SÁT NĂNG LƯỢNG TRONG CƠ QUAN
          </h3>
          <div>
            <table style={{ margin: 'auto', marginTop: '40px' }}>
              <tr>
                <td
                  className="text-right mr-1 "
                  style={{
                    width: 'auto',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
                >
                  Học viên:
                </td>
                <td
                  style={{
                    width: 'auto',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
                >
                  NGÔ HOÀNG MINH
                </td>
              </tr>
              <tr>
                <td
                  className="text-right mr-1"
                  style={{
                    width: 'auto',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
                >
                  Giảng viên hướng dẫn:
                </td>
                <td
                  style={{
                    width: 'auto',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
                >
                  TS. Phạm Trần Bích Thuận
                </td>
              </tr>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
