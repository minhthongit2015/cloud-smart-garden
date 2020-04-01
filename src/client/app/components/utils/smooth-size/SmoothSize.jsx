import React, { memo, useRef, useEffect } from 'react';
import './SmoothSize.scss';
import debounce from 'debounce';


export default memo(({ children, both, timeout }) => {
  const parent = useRef();
  const child = useRef();
  useEffect(() => {
    const parentDom = parent.current;
    const childDom = child.current;
    const computeStyle = () => {
      const width = `width: ${childDom.offsetWidth}px; max-width: ${childDom.offsetWidth}px;`;
      const height = `height: ${childDom.offsetHeight}px; max-height: ${childDom.offsetHeight}px;`;
      return `${both ? width : ''} ${height}`;
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
  }, 1);

  return (
    <div ref={parent} className="smooth-size">
      <div ref={child}>
        {children}
      </div>
    </div>
  );
});
