import React from 'react';
import './Quotes.scss';
import {
  MDBRow, MDBCol, MDBPopover, MDBPopoverBody, MDBBtn
} from 'mdbreact';
import Video from '../video/Video';


export default (props) => {
  const {
    className, color, quote: {
      _id, quote: content, author, sharedBy, previewVideo, previewAudio
    } = {}, ...restProps
  } = props;
  const audioURL = previewAudio && new URL(previewAudio);
  const audioFileName = audioURL && decodeURIComponent(
    audioURL.pathname.slice(audioURL.pathname.lastIndexOf('/') + 1)
  );

  const [showAudio, setShowAudio] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState(false);
  const audioRef = React.useRef();
  const videoRef = React.useRef();
  const showNothing = !showAudio && !showVideo;
  function handlePlayAudio() {
    if (audioRef.current.paused) {
      setShowAudio(true);
      audioRef.current.play();
    } else {
      setShowAudio(false);
      audioRef.current.pause();
    }
  }
  function handlePlayVideo() {
    setShowVideo(!showVideo);
  }

  return (
    <MDBPopover
      id={`main-quote-${_id}`}
      placement="bottom"
      clickable={false}
      domElement
      popover
    >
      <div
        className={`main-quote text-pre-wrap text-light text-center mb-3 px-2 py-2 ${className || ''}`}
        style={{ color: `${color} !important` }}
        {...restProps}
      >
        <MDBRow>
          {previewAudio && (
            <MDBCol className={`d-flex flex-column ${showNothing ? 'align-items-end' : 'align-items-center'}`}>
              <MDBBtn
                color="none"
                className={`circle-button light-button ${showNothing ? '' : 'm-auto'}`}
                onClick={handlePlayAudio}
              >
                <i className="fas fa-music" />
              </MDBBtn>
              <div className={`mt-2 ${showAudio ? '' : 'd-none'}`}>
                <a href={previewAudio} className="text-light" target="_blank" rel="noopener noreferrer">
                  <sub>{audioFileName}</sub>
                </a>
                <audio
                  ref={audioRef}
                  src={previewAudio}
                  controls
                  loop
                  style={{ height: '30px' }}
                  className="mt-2"
                >
                  <track
                    default
                    kind="captions"
                    srcLang="en"
                    src="/media/sunday.vtt"
                  />
                </audio>
              </div>
            </MDBCol>
          )}
          {previewVideo && (
            <MDBCol className={`d-flex flex-column ${showNothing ? 'align-items-start' : ''}`}>
              <MDBBtn
                color="none"
                className={`circle-button light-button ${showNothing ? '' : 'm-auto'}`}
                onClick={handlePlayVideo}
              >
                <i className="fab fa-youtube" />
              </MDBBtn>
              <Video
                videoRef={videoRef}
                title=""
                src={previewVideo}
                controls
                loop
                className={`mt-2 ${showVideo ? '' : 'd-none'}`}
              />
            </MDBCol>
          )}
        </MDBRow>
        <div className="main-quote__content">❝{content}❞</div>
        {author && <div className="main-quote__author"><i>~ {author}</i></div>}
      </div>
      <MDBPopoverBody>
        {sharedBy && <>chia sẻ bởi <span className="quote__shared-by">{sharedBy}</span></>}
      </MDBPopoverBody>
    </MDBPopover>
  );
};
