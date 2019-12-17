/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import './Video.scss';

export default class Video extends React.Component {
  static isVideo(props) {
    return props.src && props.src.includes('.mp4');
  }

  static isExternalVideo(video) {
    return video.src && video.src.match(/(facebook\.com)/);
  }

  static isYoutube(props) {
    return props.src && props.src.match(/(youtube\.com|youtu\.be\/)/);
  }

  static isEmbeded() {
    return true;
  }

  static renderVideo(video) {
    const {
      title, src, tracks, className, ...restProps
    } = video;
    return (
      <video
        src={src}
        className={`video w-100 ${className || ''}`}
        controls
        alt={title}
        {...restProps}
      >
        {tracks && tracks.map(track => (
          <track
            key={track.src}
            default
            kind={track.kind || 'captions'}
            srcLang={track.lang || 'vi'}
            src={track.src || 'sunday.vtt'}
          />
        ))}
      </video>
    );
  }

  static renderYoutube(video) {
    const {
      src, title, className, ...restProps
    } = video;
    let videoId;
    const patterns = [/\/watch\?.*?v=(.*?)(&|$)/, /youtu\.be\/(.+?)(&|$)/];
    patterns.find((pattern) => {
      const match = src.match(pattern);
      if (match && match[1]) {
        [, videoId] = match;
        return true;
      }
      return false;
    });

    return (
      <iframe
        className={`video ytb-video ${className || ''}`}
        title={title}
        type="text/html"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&hl=vi&playsinline=1&iv_load_policy=3`}
        frameBorder="0"
        allowFullScreen
        {...restProps}
      />
    );
  }

  static renderExternalVideo(video) {
    const {
      preview, src, className
    } = video;
    return (
      <a
        className={`video video-external ${className || ''}`}
        href={src}
        // title={title}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="video__preview far"
          style={{ backgroundImage: `url("${preview}")` }}
        ><i className="far fa-play-circle video__preview__play-button" />
        </div>
      </a>
    );
  }

  static renderEmbeded(video) {
    const {
      title, src, className, ...restProps
    } = video;
    let videoSrc = src;
    if (src.includes('<iframe ')) {
      const match = src.match(/src="(.*?)"/);
      if (match && match[1]) {
        [, videoSrc] = match;
      }
    }

    return (
      <iframe
        className={`video embeded-video ${className || ''}`}
        title={title}
        src={videoSrc}
        type="text/html"
        width="100%"
        height="auto"
        frameBorder="0"
        allowFullScreen
        {...restProps}
      />
    );
  }

  render() {
    const video = this.props;
    const renderers = [
      { filter: Video.isVideo, render: Video.renderVideo },
      { filter: Video.isYoutube, render: Video.renderYoutube },
      { filter: Video.isExternalVideo, render: Video.renderExternalVideo },
      { filter: Video.isEmbeded, render: Video.renderEmbeded }
    ];
    const renderer = renderers.find(renderer1 => renderer1.filter.call(Video, video));
    return (
      <div className="video-wrapper">
        {renderer && renderer.render.call(Video, video)}
      </div>
    );
  }
}
