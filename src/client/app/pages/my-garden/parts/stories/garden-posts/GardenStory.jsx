import React from 'react';
import { Row, Col } from 'mdbreact';
import './GardenStory.scss';
import TimeAgo from '../../../../../components/utils/time-ago/TimeAgo';
import ContextButton from '../../../../../components/utils/context-button/ContextButton';
import BlogPost from '../../../../../components/blog/blog-post/BlogPost';


export default class extends BlogPost {
  constructor(props) {
    super(props);
    this.previewRef = React.createRef();
    this.handleStoryLoaded = this.handleStoryLoaded.bind(this);
    this.resizeHandler = this.resizeHandler.bind(this);
    this.state = {
      loaded: false
    };
  }

  resizeHandler() {
    this.forceUpdate();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  handleStoryLoaded() {
    this.setState({
      loaded: true
    });
  }

  renderContextButton() {
    return (
      <ContextButton
        icon={<i className="fas fa-feather-alt" />}
        color="#b9b9b9"
        className="my-0 mr-0 border-0 hover-light-red"
        options={this.contextOptions}
        onSelect={this.handleContextActions}
      />
    );
  }

  render() {
    const { loaded } = this.state;
    const { post } = this.props;
    const {
      previewPhoto, title, content, createdAt
    } = post || {};
    const height = loaded && this.previewRef.current
      ? `${this.previewRef.current.offsetHeight + 15}px`
      : '';

    return (
      <div className="garden-story">
        <Row>
          <Col size="12" md="7" className="d-none d-md-block">
            <div className="garden-story__preview" ref={this.previewRef}>
              <img src={previewPhoto} alt={title} onLoad={this.handleStoryLoaded} />
            </div>

            {/* Render one more tag to trigger SmoothSize component to re-calculate */}
            {loaded && <span />}
          </Col>
          <Col
            className={`garden-story__content-column ${loaded ? 'loaded' : ''}`}
            style={{
              marginBottom: '-15px',
              height
            }}
          >
            <div className="garden-story__content d-flex flex-column">
              <div className="pb-2">
                <div className="pb-2 d-flex justify-content-between">
                  <div className="text-inset text-beauty text-sm text-1">{title}</div>
                  <div>
                    {this.renderContextButton()}
                  </div>
                </div>
                <sup>
                  <TimeAgo time={createdAt} />
                </sup>
              </div>
              <div className="pl-2 pr-2 overflow-auto modern-scrollbar-2">
                <i className="text-pre-wrap">{content}</i>
              </div>
              <div className="garden-story__preview my-2 d-block d-md-none">
                <img src={previewPhoto} alt={title} onLoad={this.handleStoryLoaded} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
