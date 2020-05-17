import React, { memo } from 'react';
import MapService from '../../../services/map/MapService';
import MapController from '../../../pages/user-network/controllers/MapController';


export default memo(({
  place, children, className = 'text-gray hover-light-red', style, ...restProps
}) => {
  function handleClick(event) {
    if (event) { event.stopPropagation(); event.preventDefault(); }
    MapController.togglePlace(place);
  }
  return (
    <a
      href={MapService.buildPlaceUrl(place)}
      className={`link py-1 ${className || ''}`}
      style={style}
      onClick={handleClick}
      {...restProps}
    >{children}
    </a>
  );
});
