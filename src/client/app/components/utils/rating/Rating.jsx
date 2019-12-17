import React from 'react';
import {
  MDBTooltip, MDBBtn,
  MDBPopover, MDBPopoverBody
} from 'mdbreact';
import './Rating.scss';
import classnames from 'classnames';
import { IconThanks } from '../../../../assets/icons';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.iconThanksRef = React.createRef();
    this.toggleRatingPopover = this.toggleRatingPopover.bind(this);
    this.handleRatingPopoverChange = this.handleRatingPopoverChange.bind(this);
    this.state = {
      isVisible: false,
      clickable: false
    };
    this.lastStateChange = Date.now();
  }

  toggleRatingPopover() {
    if (Date.now() - this.lastStateChange < 200) {
      return;
    }
    this.lastStateChange = Date.now();
    this.setState(prevState => ({
      isVisible: !prevState.isVisible || !prevState.clickable,
      clickable: !prevState.clickable
    }));
  }

  handleRatingPopoverChange(state) {
    if (Date.now() - this.lastStateChange < 200) {
      return;
    }
    this.lastStateChange = Date.now();
    this.setState({
      isVisible: state,
      clickable: !!window.isMobile
    });
  }

  handleRating(rating) {
    if (this.props.onRating) {
      this.props.onRating(rating, this.props.attachment);
    }
    this.setState({
      isVisible: false
    });
    this.iconThanksRef.current.sayThanks();
  }

  render() {
    const {
      id, totalRating = 0, totalVotes = 0, rating
    } = this.props;
    const { isVisible, clickable } = this.state;
    const averageRating = totalVotes !== 0
      ? totalRating / totalVotes
      : 0;

    return (
      <div className="rating d-flex ml-2">
        <MDBPopover
          placement="top"
          isVisible={isVisible}
          clickable={clickable}
          domElement
          popover
          onChange={this.handleRatingPopoverChange}
          id={`rating-${id}`}
        >
          <div
            className={`rating__toggle px-1 pt-1 ${rating ? 'rated' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={this.toggleRatingPopover}
          >
            <i className="fas fa-chevron-up" />
            <IconThanks ref={this.iconThanksRef} />
          </div>
          <MDBPopoverBody className="shadow-sm">
            <div className="rating__points d-flex flex-row-reverse">
              {[5, 4, 3, 2, 1].map(ratingz => (
                <MDBBtn
                  key={ratingz}
                  onClick={() => this.handleRating(ratingz)}
                  className={classnames(
                    'rating__points__point rounded-circle p-0',
                    {
                      active: rating === ratingz
                    }
                  )}
                  style={{ width: '20px', height: '20px' }}
                  color="none"
                >{ratingz}
                </MDBBtn>
              ))}
            </div>
            <div>Đánh giá mức quan trọng của tin tức này để mọi người chú ý hơn vào nó.</div>
          </MDBPopoverBody>
        </MDBPopover>
        <div>
          <div className="rating__summary d-flex">
            <MDBTooltip placement="top">
              <MDBBtn className="py-0 px-2 m-0 rating__average" size="lg" color="link">
                (<i className="rating__star fas fa-star" /> {averageRating.toFixed(2)})
              </MDBBtn>
              <div>Khuyên đọc</div>
            </MDBTooltip>
            <MDBTooltip placement="top">
              <MDBBtn className="py-0 pl-2 pr-1 m-0" size="lg" color="link">{totalRating}</MDBBtn>
              <div>tổng điểm<br />khuyên đọc</div>
            </MDBTooltip>
            <span style={{ lineHeight: '29px' }}>/</span>
            <MDBTooltip placement="top">
              <MDBBtn className="py-0 pl-1 pr-1 m-0" size="lg" color="link">{totalVotes}</MDBBtn>
              <div>lượt khuyên</div>
            </MDBTooltip>
          </div>
        </div>
      </div>
    );
  }
}
