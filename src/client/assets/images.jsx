import React from 'react';

export const FarmSrc = '/images/HydroponicTerminology_BlogLanding-768x411.jpg';
export const ShopEavesSrc = '/images/eaves.png';
export const FoodStoreSrc = '/images/fresh-vegetables-food-safety-vietnam-GAP.png';
export const ToolStoreSrc = '/images/2-dung-cu-1.jpg';
export const GardenSrc = '/images/373d744941b5cbc14f0fbe6732fc3a10.jpg';

export const FarmImage = props => <img src={FarmSrc} alt="Farm" draggable={false} {...props} />;

export default {
  FarmSrc,
  ShopEavesSrc,
  FoodStoreSrc,
  ToolStoreSrc,
  GardenSrc
};
