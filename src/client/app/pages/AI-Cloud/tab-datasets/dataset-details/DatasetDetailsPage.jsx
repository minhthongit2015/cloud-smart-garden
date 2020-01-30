import React from 'react';
import { MDBBtn } from 'mdbreact';
import PostDetails from '../../../../components/blog-base/post-details/PostDetails';
import DatasetService from '../../../../services/AI/DatasetService';


export default class extends PostDetails {
  constructor(props) {
    super(props);
    this.handleRegenerateRecords = this.handleRegenerateRecords.bind(this);
    this.state = {
      dataset: props.data,
      isRegenerating: null,
      timeStart: 0,
      timeEnd: 0,
      numRecords: 0
    };
  }

  handleRegenerateRecords() {
    this.setState({
      isRegenerating: true,
      timeStart: performance.now(),
      timeEnd: 0,
      numRecords: 0
    });
    const interval = setInterval(() => {
      this.setState({
        timeEnd: performance.now()
      });
    }, 50);
    DatasetService.regenerateRecords(this.state.dataset._id)
      .then((res) => {
        this.setState({
          numRecords: res.data.length,
          isRegenerating: false,
          timeEnd: performance.now()
        });
      }).finally(() => {
        clearInterval(interval);
      });
  }

  renderBelowPreview() {
    const {
      isRegenerating, timeStart, timeEnd, numRecords
    } = this.state;
    const timeEslapsed = (timeEnd - timeStart) / 1000;

    return (
      <div className="my-3">
        <MDBBtn className="py-2 px-3" onClick={this.handleRegenerateRecords}>Regenerate Records</MDBBtn>
        {isRegenerating != null && (
          <div>
            <div className={isRegenerating ? 'text-warning' : 'text-default'}>
              {isRegenerating ? 'Đang khởi tạo lại các records' : 'Tái tạo các records hoàn tất!'}
            </div>
            {!!numRecords && (
              <div><b className="text-default">{numRecords}</b> records được cập nhập</div>
            )}
            {timeEnd > timeStart && (
              <div>Thời gian: {timeEslapsed.toFixed(2)}s</div>
            )}
          </div>
        )}
      </div>
    );
  }
}
