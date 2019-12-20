import React from 'react';
import { MDBPopover, MDBPopoverBody } from 'mdbreact';
import './Quotes.scss';


export default (props) => {
  const {
    className, color, quote: {
      _id, quote: content, author, sharedBy
    } = {}, ...restProps
  } = props;
  return (
    <MDBPopover
      id={`quote-${_id}`}
      placement="top"
      clickable={false}
      domElement
      popover
    >
      <div
        className={`quote text-pre-wrap text-center px-2 py-2 ${className || ''}`}
        style={{ color: `${color} !important` }}
        {...restProps}
      >
        <div className="quote__content">{content}</div>
        {author && <div className="quote__author"><i>~ {author}</i></div>}
      </div>
      <MDBPopoverBody>
        chia sẻ bởi <span className="quote__shared-by">{sharedBy}</span>
      </MDBPopoverBody>
    </MDBPopover>
  );
};
