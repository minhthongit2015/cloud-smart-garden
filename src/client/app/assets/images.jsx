import React from 'react';

export const FarmSrc = 'http://static.saferbrand.com/media/articles/images/373/HydroponicTerminology_BlogLanding-768x411.jpg';
export const ShopEavesSrc = '/images/eaves.png';

export const FarmImage = props => <img src={FarmSrc} alt="Farm" draggable={false} {...props} />;

export default {
  FarmSrc,
  ShopEavesSrc
};
