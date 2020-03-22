import React from 'react';
import { MDBCollapse } from 'mdbreact';
import Toggleable from '../../../components/utils/toggleable/Toggleable';
import Video from '../../../components/utils/video/Video';
import './TodaySong.scss';

const TODAY_SONG_KEY = 'openTodaySong';


export default class extends Toggleable {
  constructor(props, context) {
    super(props, context);
    this.todaySongRef = React.createRef();
    this.bind(this.toggleExpand);

    this.state = {
      playing: false,
      isOpen: this.getCachedValue(TODAY_SONG_KEY, true),
      isExpand: false
    };
  }

  handleToggle(...args) {
    super.handleToggle(...args);
    this.cacheValue(TODAY_SONG_KEY, this.isOpen);
  }

  toggleExpand() {
    this.setState(prevState => ({ isExpand: !prevState.isExpand }));
  }

  render() {
    const { className, src } = this.props;
    const parent = this.todaySongRef.current && this.todaySongRef.current.parentNode;

    return (
      <div
        ref={this.todaySongRef}
        className={`today-song ${className || ''} ${this.isReallyClosed ? 'cursor-pointer' : ''}`}
        onClick={this.isReallyClosed ? this.toggle : null}
      >
        <div className="today-song__title"><i className="fas fa-music music-note" /> {'Today\'s Song'}</div>
        <div className="today-song__toggle" onClick={this.toggle}>
          {this.isOpen ? (
            <i className="fas fa-caret-right" />
          ) : (
            <i className="fas fa-caret-left" />
          )}
        </div>
        {this.isOpen && (
          <div className="today-song__expand" onClick={this.toggleExpand}>
            {this.state.isExpand ? (
              <i className="fas fa-compress" />
            ) : (
              <i className="fas fa-expand" />
            )}
          </div>
        )}
        <MDBCollapse isOpen={this.isOpen}>
          <div
            className="today-song__song"
            style={{
              width: this.state.isExpand
                ? `${parent.offsetWidth * 0.4}px`
                : `${parent ? (parent.offsetWidth * 0.2) : 150}px`
            }}
          >
            <Video src={src} alt="Today Song" loop />
          </div>
        </MDBCollapse>
      </div>
    );
  }
}
