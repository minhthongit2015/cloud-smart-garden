import React from 'react';
import { Row, Col } from 'mdbreact';
import emojiRegex from 'emoji-regex/text';
import './GardenStory.scss';
import TimeAgo from '../../../../../components/utils/time-ago/TimeAgo';
import ContextButton from '../../../../../components/utils/context-button/ContextButton';
import BlogPost from '../../../../../components/blog/blog-post/BlogPost';

const emoRegex = emojiRegex();


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

  renderPreview(previewRef) {
    const { loaded } = this.state;
    const { post } = this.props;
    const {
      previewPhoto, previewAudio, title, totalVotes
    } = post || {};

    // const audioURL = previewAudio && new URL(previewAudio);
    // const audioFileName = audioURL && decodeURIComponent(
    //   audioURL.pathname.slice(audioURL.pathname.lastIndexOf('/') + 1)
    // );

    return (
      <div className="garden-story__preview overlapable" ref={previewRef}>
        <img src={previewPhoto} alt={title} onLoad={this.handleStoryLoaded} />
        {previewAudio && (
          <div className="overlap block bottom p-2">
            <audio
              className="garden-story__preview-audio"
              // ref={audioRef}
              src={previewAudio}
              controls
              // loop
            >
              <track default kind="captions" srcLang="en" src="/media/sunday.vtt" />
            </audio>
          </div>
        )}
        <div className="overlap right bottom p-2 text-white hover-gray">
          <div className="garden-story__emotions">
            <span className="hover-light-red">
              <i className="fas fa-heart" /> {totalVotes || 44}
            </span>

          </div>
        </div>

        {/* Render one more tag to trigger SmoothSize component to re-calculate */}
        {loaded && <span />}
      </div>
    );
  }

  render() {
    const { loaded } = this.state;
    const { post } = this.props;
    const {
      title, content: rawContent, createdAt
    } = post || {};
    const height = loaded && this.previewRef.current
      ? `${this.previewRef.current.offsetHeight + 15}px`
      : '';
    const content = {
      __html: rawContent.replace(emoRegex, emoji => `<emoji>${emoji}</emoji>`)
    };

    return (
      <div className="garden-story">
        <Row>
          <Col size="12" md="7" className="d-none d-md-block">
            {this.renderPreview(this.previewRef)}
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
                <i className="text-pre-wrap" dangerouslySetInnerHTML={content} />
              </div>
              <div className="d-block d-md-none my-2">
                {this.renderPreview()}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
