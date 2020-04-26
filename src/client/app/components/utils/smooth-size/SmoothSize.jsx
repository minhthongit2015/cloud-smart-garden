import React, { memo, useRef, useEffect } from 'react';
import './SmoothSize.scss';
import debounce from 'debounce';


export default memo(({
  children, both, timeout, padding
}) => {
  const parent = useRef();
  const child = useRef();
  useEffect(() => {
    const parentDom = parent.current;
    const childDom = child.current;
    const computeStyle = () => {
      const heightSize = Number.isNaN(+padding)
        ? childDom.offsetHeight
        : childDom.offsetHeight + +padding * 2;
      const paddingz = !Number.isNaN(+padding) && `padding-top: ${+padding}px; padding-bottom: ${+padding}px;`;
      const width = `width: ${childDom.offsetWidth}px; max-width: ${childDom.offsetWidth}px;`;
      const height = `height: ${heightSize}px; max-height: ${heightSize}px;`;
      return `${both ? width : ''} ${height} ${paddingz}`;
    };
    parentDom.style = computeStyle();
    const _resizeHandler = () => {
      parentDom.style = computeStyle();
      // setTimeout(() => {
      //   parentDom.style = '';
      // }, 500);
    };
    const resizeHandler = timeout != null
      ? debounce(_resizeHandler, +timeout)
      : _resizeHandler;
    childDom.addEventListener('DOMSubtreeModified', resizeHandler);
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, 1);

  return (
    <div ref={parent} className="smooth-size">
      <div ref={child}>
        {children}
      </div>
    </div>
  );
});
